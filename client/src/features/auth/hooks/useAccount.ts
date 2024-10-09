import { useState } from 'react';
import { Account } from '@/features/auth/types/account.type';

export default function useAccount() {
  const [ account, setAccount ] = useState<Account | null>(null);

  const updateAccount = (newAccount: Account) => {
    setAccount(newAccount);
  };

  return {
    account,
    updateAccount,
  };
}
