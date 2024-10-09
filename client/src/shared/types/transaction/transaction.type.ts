import { TransactionType } from '@/shared/types';

export interface Transaction {
  id: number;
  type: TransactionType;
  hash: string;
  coin: string;
  amount: string;
}
