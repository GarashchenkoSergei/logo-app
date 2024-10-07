'use client'

import { AuthButton } from '@/features/auth';
import { TransactionList, TransactionTabs } from '@/features/transaction';

export default function DepositPage() {
  return (
    <>
      <header className="bg-gray-800 p-4">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <h1 className="text-2xl uppercase">Logo</h1>
          <AuthButton />
        </div>
      </header>
      <div className="container mx-auto p-4">
        <main className="mt-8">
          <TransactionTabs />
          <TransactionList />
        </main>
      </div>
    </>
  );
}
