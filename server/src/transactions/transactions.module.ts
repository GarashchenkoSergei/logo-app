import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from '@transactions/transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '@transactions/entities/account.entity';
import { Transaction } from '@transactions/entities/transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    TypeOrmModule.forFeature([Transaction]),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
