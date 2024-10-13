import Web3 from 'web3';
import { contractABI, isProviderRpcError } from '@/features/transaction/lib/utils';

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

export const depositEthereum = async (from: string, amount: string): Promise<string> => {
  try {
    const web3 = new Web3(window.ethereum);
    const contractAddress = '0x24c5a43a0d5afd8d4a1afd9d262af6b0d43a5fa9';
    const amountInWei = web3.utils.toWei(amount, 'ether');
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    const transaction = await contract.methods.deposit().send({
      from,
      value: amountInWei,
    });

    console.log('Deposit transaction', transaction);

    return transaction.transactionHash.toString();
  } catch (error: unknown) {
    if (isProviderRpcError(error) && error.message.includes('User denied')) {
      throw new Error(error.message);
    }

    console.error('Error during deposit transaction:', error);
    throw new Error('Failed to complete deposit transaction.');
  }
}

export const withdrawEthereum = async (from: string, amount: string): Promise<string> => {
  try {
    // TODO: Implement. Possibly refactor ethereum.ts to Class.
    const contractAddress = '0x24c5a43a0d5afd8d4a1afd9d262af6b0d43a5fa9';
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const transaction = await contract.methods.withdraw(amount).send({
      from,
    });

    console.log('Withdraw transaction', transaction);

    return transaction.transactionHash.toString();
  } catch (error: unknown) {
    if (isProviderRpcError(error) && error.message.includes('User denied')) {
      throw new Error(error.message);
    }

    console.error('Error during withdraw transaction:', error);
    throw new Error('Failed to complete withdraw transaction.');
  }
}
