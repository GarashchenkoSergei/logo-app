import { useState } from 'react';
import { TransactionType } from '@/shared/types/transaction/transaction-type.type';
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Label,
  Input,
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/shared/ui';
import { postTransaction } from '@/features/transaction/api/transactions';
import { TransactionTabsProps } from '@/features/transaction/ui/transaction-tabs.type';

// For future growth of coin support
const supportedCoinList = [ 'ETH' ];

export function TransactionTabs({ address }: TransactionTabsProps) {
  const [ type, setType ] = useState<TransactionType>(TransactionType.DEPOSIT);
  const [ amount, setAmount ] = useState<string>('');
  const [ coin, setCoin ] = useState<string>(supportedCoinList[0]);

  async function handleTransaction(
    type: TransactionType,
    amount: string,
    coin: string
  ) {
    if (!amount || !coin) {
      alert('Please provide both amount and coin.');
      return;
    }

    await postTransaction(type, address, amount, coin);
  }

  return (
    <Tabs defaultValue={TransactionType.DEPOSIT}>
      <TabsList className="w-[240px]">
        <TabsTrigger
          className="capitalize w-[50%]"
          value={TransactionType.DEPOSIT}
          onClick={() => setType(TransactionType.DEPOSIT)}
        >
          {TransactionType.DEPOSIT}
        </TabsTrigger>
        <TabsTrigger
          className="capitalize w-[50%]"
          value={TransactionType.WITHDRAW}
          onClick={() => setType(TransactionType.WITHDRAW)}
        >
          {TransactionType.WITHDRAW}
        </TabsTrigger>
      </TabsList>

      <div className="mt-4">
        <Label className="block mt-4 mb-2">Select coin</Label>
        <Select value={coin} onValueChange={setCoin}>
          <SelectTrigger className="w-[240px]">
            <SelectValue placeholder="Select Coin" />
          </SelectTrigger>
          <SelectContent>
            {supportedCoinList.map((coin) => (
              <SelectItem key={coin} value={coin}>
                {coin}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Label htmlFor="amount" className="block mt-4 mb-2">
          Amount
        </Label>
        <Input
          id="amount"
          type="number"
          placeholder="0.0002"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-[240px]"
        />

        <Button
          className="btn mt-4 capitalize w-[240px]"
          onClick={() => handleTransaction(type, amount, coin)}
          variant="destructive"
          size="lg"
          disabled={!address}
        >
          {type === TransactionType.DEPOSIT
            ? TransactionType.DEPOSIT
            : TransactionType.WITHDRAW}
        </Button>
      </div>
    </Tabs>
  );
}
