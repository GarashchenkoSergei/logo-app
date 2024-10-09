import { Account } from '@/features/auth/types/account.type';

export interface AuthButtonProps {
  address: string | undefined;
  updateFn: (newAccount: Account) => void;
}
