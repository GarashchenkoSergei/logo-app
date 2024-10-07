import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '@transactions/entities/transaction.entity';
import { Account } from '@transactions/entities/account.entity';
import { v4 as uuidv4 } from 'uuid';
import { TransactionType } from '@transactions/enums/transaction-type.enum';
import Web3 from 'web3';
import BigNumber from 'bignumber.js';

@Injectable()
export class TransactionsService {
  // TODO: move to web3 service
  private web3: Web3;

  constructor(
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>,
    @InjectRepository(Account) private accountRepo: Repository<Account>,
  ) {
    this.web3 = new Web3(
      new Web3.providers.HttpProvider(`${process.env.WEB3_NODE}`),
    );
  }

  async deposit(
    type: TransactionType,
    coin: string,
    amount: number,
    account: string,
  ): Promise<Transaction> {
    // TODO: move to web3 service
    const balanceWei = await this.web3.eth.getBalance(account);
    const balanceEth = this.web3.utils.fromWei(balanceWei, 'ether');

    if (parseFloat(balanceEth) < amount) {
      throw new Error('Insufficient balance for this deposit');
    }

    let existingAccount = await this.accountRepo.findOne({
      where: { externalAddress: account },
    });
    if (!existingAccount) {
      existingAccount = this.accountRepo.create({
        externalAddress: account,
        balance: 0,
      });
      await this.accountRepo.save(existingAccount);
    }

    const existingBalance = new BigNumber(existingAccount.balance);
    const amountBig = new BigNumber(amount);
    existingAccount.balance = existingBalance.plus(amountBig).toNumber();

    await this.accountRepo.save(existingAccount);

    // TODO: this needs to be handled by libraries out of the box
    const transaction = this.transactionRepo.create({
      type,
      coin,
      amount,
      account: existingAccount,
      hash: uuidv4(),
    });

    return await this.transactionRepo.save(transaction);
  }

  async withdraw(
    type: TransactionType,
    coin: string,
    amount: number,
    account: string,
  ): Promise<Transaction> {
    const existingAccount = await this.accountRepo.findOne({
      where: { externalAddress: account },
    });

    if (!existingAccount || existingAccount.balance < amount) {
      throw new Error(
        'Insufficient balance in your internal account for withdrawal',
      );
    }

    const existingBalance = new BigNumber(existingAccount.balance);
    const amountBig = new BigNumber(amount);
    existingAccount.balance = existingBalance.minus(amountBig).toNumber();

    await this.accountRepo.save(existingAccount);

    const transaction = this.transactionRepo.create({
      type,
      coin,
      amount,
      account: existingAccount,
      hash: uuidv4(),
    });

    return await this.transactionRepo.save(transaction);
  }

  async getAllTransactions(account: string): Promise<Transaction[]> {
    return this.transactionRepo.find({
      relations: ['account'],
      where: {
        account: {
          externalAddress: account,
        },
      },
    });
  }
}
