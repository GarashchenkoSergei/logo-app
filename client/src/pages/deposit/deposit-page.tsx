'use client';

import { AuthButton } from '@/features/auth';
import { TransactionList, TransactionTabs } from '@/features/transaction';
import useAccount from '@/features/auth/hooks/useAccount';
import { useEffect } from 'react';
import { fetchAndSetAccount } from '@/features/auth/api/account';

export default function DepositPage() {
  const { account, updateAccount } = useAccount();

  useEffect(() => {
    if (!account) {
      fetchAndSetAccount(updateAccount);
    }
  }, [ account, updateAccount ]);

  return (
    <>
      <header className="bg-gray-800 p-4">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <h1 className="text-2xl uppercase">Logo</h1>
          <AuthButton address={account?.address} updateFn={updateAccount}/>
        </div>
      </header>
      <div className="container mx-auto p-4">
        <main className="mt-8">
          {account?.balance !== 'undefined' && <h3 className="text-l mb-4">Balance: {account?.balance}</h3>}
          <TransactionTabs address={account?.address} updateFn={updateAccount}/>
          <TransactionList account={account} />
        </main>
      </div>
    </>
  );
}
