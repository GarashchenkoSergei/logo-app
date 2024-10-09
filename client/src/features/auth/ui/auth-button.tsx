import { Button } from '@/shared/ui';
import { getMetaMaskAcc } from '@/features/auth/api/account';
import { AuthButtonProps } from '@/features/auth/ui/auth-button.type';
import { Account } from '@/features/auth/types/account.type';

export function AuthButton({ address, updateFn }: AuthButtonProps) {
  const handleClick = async () => {
    const acc: Account | undefined = await getMetaMaskAcc();
    if (acc) {
      updateFn(acc);
    }
  }

  return (
    <Button onClick={handleClick} className="btn" variant={address ? 'link' : 'default'} disabled={!!address}>
      {address
        ? `Connected: ${address.slice(0, 6)}...${address.slice(-4)}`
        : 'Login with MM'}
    </Button>
  );
}
