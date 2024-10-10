import { Transaction, TransactionType } from '@/shared/types';
import {
  depositEthereum,
  withdrawEthereum,
} from '@/features/transaction/api/ethereum';
import { handleTransactionError, retry } from '@/features/transaction/lib/utils';
import { apiRequest } from '@/shared/lib/utils';

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

// Rework with some queue service
const retryPostTransaction = (
  type: TransactionType,
  address: string,
  amount: string,
  coin: string,
  hash: string,
) => retry(() => postTransaction(type, address, amount, coin, hash));

export const handleTransaction = async (
  type: TransactionType,
  address: string,
  amount: string,
  coin: string,
) => {
  try {
    let hash: string | undefined;

    if (type === TransactionType.DEPOSIT) {
      hash = await depositEthereum(address, amount);
      console.log('Deposit transaction hash:', hash);
    }

    if (type === TransactionType.WITHDRAW) {
      hash = await withdrawEthereum(address, amount);
      console.log('Withdraw transaction hash:', hash);
    }

    if (hash) {
      try {
        await postTransaction(type, address, amount, coin, hash);
      } catch (error) {
        console.error('Error saving transaction to server:', error);
        await retryPostTransaction(type, address, amount, coin, hash);
      }
    }
  } catch (error: unknown) {
    handleTransactionError(error);
  }
};

export const postTransaction = async (
  type: TransactionType,
  address: string,
  amount: string,
  coin: string,
  hash: string,
): Promise<void> => {
  const requestBody = { type, amount, coin, address, hash };

  try {
    const data = await apiRequest(`${BASE_API_URL}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    if (data?.account) {
      alert(`Transaction '${type}' successful. Updated balance: ${data.account.balance}`);
    }
  } catch (error) {
    console.error('Error posting transaction:', error);
    throw new Error(`Failed to post transaction: ${error}`);
  }
};

export const fetchTransactions = async (
  address: string,
): Promise<Transaction[] | undefined> => {
  try {
    return await apiRequest(`${BASE_API_URL}/transactions?address=${address}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    alert(`Error occurred wile fetching transactions list: ${error}`);
    return undefined;
  }
};
