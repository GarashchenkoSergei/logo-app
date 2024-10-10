import { useEffect, useState } from 'react';
import { Transaction } from '@/shared/types';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui';
import { getTransactions } from '@/features/transaction/api/transactions';
import { TransactionListProps } from '@/features/transaction/ui/transaction-list.type';

export function TransactionList({ account }: TransactionListProps) {
  const [ transactions, setTransactions ] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchAndSetTransactions = async () => {
      if (account) {
        const data = await getTransactions(account.address);

        if (data) {
          setTransactions(data);
        }
      }
    };

    fetchAndSetTransactions();
  }, [ account ]);

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
