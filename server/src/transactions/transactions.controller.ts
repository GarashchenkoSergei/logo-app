import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Query,
  Get,
} from '@nestjs/common';
import { TransactionsService } from '@transactions/transactions.service';
import { TransactionType } from '@transactions/enums/transaction-type.enum';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionService: TransactionsService) {}

  @Post()
  async saveTransaction(
    @Body('type') type: TransactionType,
    @Body('coin') coin: string,
    @Body('amount') amount: string,
    @Body('address') address: string,
    @Body('hash') hash: string,
  ) {
    try {
      return await this.transactionService.save(
        type,
        coin,
        amount,
        address,
        hash,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getAllTransactions(@Query('address') address: string) {
    return await this.transactionService.getAllTransactions(address);
  }
}
