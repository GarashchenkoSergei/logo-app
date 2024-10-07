import { useEffect, useState } from 'react';
import { Transaction } from '@/shared/types';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui';

export function TransactionList() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ transactions, setTransactions ] = useState<Transaction[]>([]);

  useEffect(() => {
    const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

    const fetchTransactions = async () => {
      try {
        const account = localStorage.getItem('acc');
        const response = await fetch(`${BASE_API_URL}/transactions?account=${account}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        setTransactions(data);
      } catch (error) {
        console.error('Transaction error:', error);
        alert('Error occurred');
      }
    };

    fetchTransactions();
  }, []);

  return (
    <Table className="mt-8">
      <TableCaption>Transaction History</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Type</TableHead>
          <TableHead>Hash</TableHead>
          <TableHead>Coin</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((tx) => (
          <TableRow key={tx.id}>
            <TableCell className="font-medium">{tx.type}</TableCell>
            <TableCell>{tx.hash}</TableCell>
            <TableCell>{tx.coin}</TableCell>
            <TableCell className="text-right">{tx.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
