import { Account } from '@/features/auth/types/account.type';

export interface TransactionTabsProps {
  address: string | undefined;
  updateFn: (newAccount: Account) => void;
}
