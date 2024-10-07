import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Account } from '@transactions/entities/account.entity';
import { TransactionType } from '@transactions/enums/transaction-type.enum';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: TransactionType })
  type: TransactionType;

  @Column()
  coin: string;

  @Column({ type: 'decimal', precision: 18, scale: 8 })
  amount: number;

  @Column({ unique: true })
  hash: string;

  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => Account, (account) => account.transactions)
  account: Account;
}
