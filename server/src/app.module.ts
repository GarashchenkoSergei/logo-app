import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '@transactions/entities/account.entity';
import { AuthModule } from '@auth/auth.module';
import { Transaction } from '@transactions/entities/transaction.entity';
import { TransactionsModule } from '@transactions/transactions.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.POSTGRES_DATABASE,
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      entities: ['**/*.entity.js'],
      synchronize: true, // This is for demo only, should be removed for prod uses and migrations should be added
    }),
    TypeOrmModule.forFeature([Account, Transaction]),
    TransactionsModule,
    AuthModule,
  ],
})
export class AppModule {}
