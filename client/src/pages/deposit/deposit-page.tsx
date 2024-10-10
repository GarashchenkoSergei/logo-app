'use client';

import { AuthButton } from '@/features/auth';
import { TransactionList, TransactionTabs } from '@/features/transaction';
import useAccount from '@/features/auth/hooks/useAccount';
import { useEffect } from 'react';
import { fetchAccount } from '@/features/transaction/api/ethereum';

export default function DepositPage() {
  const { account, updateAccount } = useAccount();

  useEffect(() => {
    const fetchAndUpdateAccount = async () => {
      try {
        const fetchedAccount = await fetchAccount();

        if (fetchedAccount) {
          updateAccount(fetchedAccount);
        }
      } catch (error) {
        alert(`Error fetching account: ${error}`);
      }
    };

    fetchAndUpdateAccount();
  }, [ updateAccount ]);

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
          <TransactionTabs address={account?.address}/>
          <TransactionList address={account?.address}/>
        </main>
      </div>
    </>
  );
}
