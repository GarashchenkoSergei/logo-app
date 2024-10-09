import { Transaction, TransactionType } from '@/shared/types';

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

const apiRequest = async (url: string, options: RequestInit) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Network error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Request Error: ${error}`);
    throw new Error('Failed to fetch data. Please try again later.');
  }
};

export const postTransaction = async (
  type: TransactionType,
  account: string | undefined,
  amount: string,
  coin: string,
): Promise<void> => {
  if (!account) {
    return;
  }

  const requestBody = {
    type,
    amount: parseFloat(amount),
    coin,
    account,
  };

  try {
    const data = await apiRequest(`${BASE_API_URL}/transactions/${type}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    if (data?.account) {
      alert(`Transaction '${type}' successful. Updated balance: ${data.account.balance}`);
    } else {
      alert('Transaction failed');
    }
  } catch (error) {
    alert(`Error occurred: ${error}`);
  }
};

export const fetchTransactions = async (account: string | undefined): Promise<Transaction[] | undefined> => {
  if (!account) {
    return undefined;
  }

  try {
    return await apiRequest(
      `${BASE_API_URL}/transactions?account=${account}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    alert(`Error occurred: ${error}`);
    return undefined;
  }
};
