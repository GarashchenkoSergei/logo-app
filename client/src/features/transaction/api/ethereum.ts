import Web3 from 'web3';
import { contractABI } from '@/features/transaction/lib/utils';
import { TransactionType } from '@/shared/types';

interface EthereumWindow extends Window {
  ethereum?: {
    request: (args: { method: string; params?: any[] }) => Promise<any>;
  };
}

declare const window: EthereumWindow;

export const getCurrentMetaMaskAcc = async (): Promise<string | undefined> => {
  if (typeof window.ethereum === 'undefined') {
    console.error('MetaMask is not installed');
    return undefined;
  }

  try {
    const accounts = await window.ethereum!.request({ method: 'eth_accounts' });

    if (accounts && accounts.length > 0) {
      return accounts[0];
    }

    console.warn('No accounts found');
    return undefined;
  } catch (error) {
    console.error('Error fetching account:', error);
    return undefined;
  }
};

export const requestMetaMaskAcc = async (): Promise<string | undefined> => {
  if (typeof window.ethereum === 'undefined') {
    console.error('MetaMask is not installed');
    return undefined;
  }

  try {
    const accounts = await window.ethereum!.request({
      method: 'eth_requestAccounts',
    });

    if (accounts && accounts.length > 0) {
      return accounts[0];
    }

    console.warn('No accounts found');
    return undefined;
  } catch (error) {
    console.error('MetaMask connection error:', error);
    return undefined;
  }
};

const sendEthereumTransaction = async (
  from: string,
  amount: string,
  methodName: TransactionType,
): Promise<string> => {
  try {
    const web3 = new Web3(window.ethereum);
    const contractAddress = '0x24c5a43a0d5afd8d4a1afd9d262af6b0d43a5fa9';
    const amountInWei = web3.utils.toWei(amount, 'ether');
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    const transaction = await contract.methods[methodName](amountInWei).send({
      from,
    });

    console.log(`${methodName} transaction`, transaction);

    return transaction.transactionHash.toString();
  } catch (error) {
    console.error(`Error during ${methodName} transaction:`, error);
    throw new Error(`Failed to complete ${methodName} transaction.`);
  }
};

export const depositEthereum = async (from: string, amount: string) => {
  return sendEthereumTransaction(from, amount, TransactionType.DEPOSIT);
};

export const withdrawEthereum = async (from: string, amount: string) => {
  return sendEthereumTransaction(from, amount, TransactionType.WITHDRAW);
};
