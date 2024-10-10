import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '@/account/entities/account.entity';
import { TransactionType } from '@transactions/enums/transaction-type.enum';
import BigNumber from 'bignumber.js';
import { Transaction } from '@transactions/entities/transaction.entity';

@Injectable()
export class TransactionsService {
  private readonly logger = new Logger(TransactionsService.name);

  constructor(
    @InjectRepository(Account)
    private accountRepo: Repository<Account>,
    @InjectRepository(Transaction)
    private transactionRepo: Repository<Transaction>,
  ) {}

  async save(
    type: TransactionType,
    coin: string,
    amount: string,
    address: string,
    hash: string,
  ): Promise<Account> {
    let existingAccount = await this.accountRepo.findOne({
      where: { externalAddress: address },
    });

    if (!existingAccount) {
      this.logger.log(`Creating new account entry for ${address}`);
      existingAccount = this.accountRepo.create({
        externalAddress: address,
        balance: '0',
      });
      await this.accountRepo.save(existingAccount);
    }

    const existingBalance = new BigNumber(existingAccount.balance);
    const amountBig = new BigNumber(amount);
    existingAccount.balance = existingBalance.plus(amountBig).toString();

    await this.accountRepo.save(existingAccount);

    const newTransaction = this.transactionRepo.create({
      type,
      coin,
      amount,
      hash,
      account: existingAccount,
    });

    await this.transactionRepo.save(newTransaction);

    return existingAccount;
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
