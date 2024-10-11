import { apiRequest } from '@/shared/lib/utils';
import { Account } from '@/features/auth/types/account.type';
import { getCurrentMetaMaskAcc, requestMetaMaskAcc } from '@/features/transaction/api/ethereum';

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchAndSetAccount = async (
  updateFn: (account: Account) => void,
  isClicked: boolean = false
): Promise<void> => {
  try {
    const fetchedAccount = isClicked
      ? await requestMetaMaskAcc()
      : await getCurrentMetaMaskAcc();

    if (fetchedAccount) {
      const accountData = await getAccountApiData(fetchedAccount);

      const updatedAccount = accountData
        ? accountData
        : { address: fetchedAccount, balance: '0' };
      updateFn(updatedAccount);
    }
  } catch (error) {
    alert(`Error fetching account: ${error}`);
  }
};

export const getAccountApiData = async (
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
