import { apiRequest } from '@/shared/lib/utils';
import { Account } from '@/features/auth/types/account.type';
import { fetchOrRequestMetaMaskAccount } from '@/features/transaction/api/ethereum';

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchAndSetAccount = async (
  updateFn: (account: Account) => void
): Promise<void> => {
  try {
    const fetchedAccount = await fetchOrRequestMetaMaskAccount();

    if (fetchedAccount) {
      const accountData = await getAccountData(fetchedAccount);

      const updatedAccount = accountData
        ? accountData
        : { address: fetchedAccount, balance: '0' };
      updateFn(updatedAccount);
    }
  } catch (error) {
    alert(`Error fetching account: ${error}`);
  }
};

export const getAccountData = async (
  address: string,
): Promise<Account | undefined> => {
  try {
    const data = await apiRequest(`${BASE_API_URL}/account?address=${address}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    return {
      address: data.externalAddress,
      balance: data.balance,
    };
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
