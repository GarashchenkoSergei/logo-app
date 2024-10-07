export const getAccount = async (eth: any): Promise<string | null> => {
  const accounts = await eth.request({ method: 'eth_accounts' });

  if (accounts.length) {
    localStorage.setItem('acc', accounts[0]);

    return accounts[0]
  }

  return null;
}
