import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from '@transactions/transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '@/account/entities/account.entity';
import { Transaction } from '@transactions/entities/transaction.entity';
import { AccountService } from '@/account/account.service';

@Module({
  imports: [TypeOrmModule.forFeature([Account, Transaction])],
  controllers: [TransactionsController],
  providers: [TransactionsService, AccountService],
})
export class TransactionsModule {}
