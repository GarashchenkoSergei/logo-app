import { Account } from '@/features/auth/types/account.type';
import { formatEther } from 'ethers';

interface EthereumWindow extends Window {
  ethereum?: {
    request: (args: { method: string; params?: any[] }) => Promise<any>;
  };
}

declare const window: EthereumWindow;

const convertWeiToEther = (wei: string): string => {
  return formatEther(wei);
};

const isMetaMaskInstalled = (): boolean => {
  return typeof window.ethereum !== 'undefined';
};

export const fetchAccount = async (): Promise<Account | undefined> => {
  if (!isMetaMaskInstalled()) {
    console.error('MetaMask is not installed');
    return undefined;
  }

  try {
    const accounts = await window.ethereum!.request({ method: 'eth_accounts' });

    if (accounts && accounts.length > 0) {
      const address = accounts[0];

      const balance = await window.ethereum!.request({
        method: 'eth_getBalance',
        params: [ address, 'latest' ],
      });

      return {
        address,
        balance: convertWeiToEther(balance),
      };
    }

    console.warn('No accounts found');
    return undefined;
  } catch (error) {
    console.error('Error fetching account:', error);
    return undefined;
  }
};

export const getMetaMaskAcc = async (): Promise<Account | undefined> => {
  if (!isMetaMaskInstalled()) {
    alert('Please install MetaMask!');
    return undefined;
  }

  try {
    const accounts = await window.ethereum!.request({
      method: 'eth_requestAccounts',
    });

    if (accounts && accounts.length > 0) {
      const address = accounts[0];

      const balance = await window.ethereum!.request({
        method: 'eth_getBalance',
        params: [ address, 'latest' ],
      });

      return {
        address,
        balance: convertWeiToEther(balance),
      };
    }

    console.warn('No accounts found');
    return undefined;
  } catch (error) {
    console.error('MetaMask connection error:', error);
    return undefined;
  }
};
