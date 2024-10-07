import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { TransactionsService } from '@transactions/transactions.service';
import { TransactionType } from '@transactions/enums/transaction-type.enum';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionService: TransactionsService) {}

  @Post('deposit')
  async deposit(
    @Body('type') type: TransactionType,
    @Body('coin') coin: string,
    @Body('amount') amount: number,
    @Body('account') account: string,
  ) {
    return await this.transactionService.deposit(type, coin, amount, account);
  }

  @Post('withdraw')
  async withdraw(
    @Body('type') type: TransactionType,
    @Body('coin') coin: string,
    @Body('amount') amount: number,
    @Body('account') account: string,
  ) {
    return await this.transactionService.withdraw(type, coin, amount, account);
  }

  @Get()
  async getAllTransactions(@Query('account') account: string) {
    return await this.transactionService.getAllTransactions(account);
  }
}
