// to remove ethereum undefined on window ts error
import { getAccount } from '@/entities/account/lib/utils';

declare const window: any;

import { useState, useEffect } from 'react';
import { Button } from '@/shared/ui';

export function AuthButton() {
  const [ account, setAccount ] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccount = async () => {
      if (window.ethereum) {
        try {
          const account = await getAccount(window.ethereum); // Await async call here
          if (account) {
            setAccount(account); // Set the account if found
          }
        } catch (error) {
          console.error('Error fetching account:', error);
        }
      }
    };

    fetchAccount();
  }, []);

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.error('MetaMask connection error', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  return (
    <Button onClick={connectMetaMask} className="btn">
      {account
        ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
        : 'Login with MM'}
    </Button>
  );
}
