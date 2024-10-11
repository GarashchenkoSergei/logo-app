import { Button } from '@/shared/ui';
import { AuthButtonProps } from '@/features/auth/ui/auth-button.type';
import { fetchAndSetAccount } from '@/features/auth/api/account';

export function AuthButton({ address, updateFn }: AuthButtonProps) {
  const handleClick = async () => {
    await fetchAndSetAccount(updateFn, true);
  };

  return (
    <Button onClick={handleClick} className="btn" variant={address ? 'link' : 'default'} disabled={!!address}>
      {address
        ? `Connected: ${address.slice(0, 6)}...${address.slice(-4)}`
        : 'Login with MM'}
    </Button>
  );
}
