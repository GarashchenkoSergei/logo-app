export const retry = async (fn: () => Promise<any>, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      await fn();
      return;
    } catch (error) {
      console.error(`Retry ${i + 1} failed`, error);
      if (i === retries - 1) {
        console.error('Max retries reached.');
      }
    }
  }
};

export const handleTransactionError = (error: unknown) => {
  if (error instanceof Error) {
    console.error('Transaction error:', error.message);

    if (error.message.includes('insufficient funds')) {
      alert('Insufficient funds for this transaction.');
    } else if (error.message.includes('unknown account')) {
      alert('Account not recognized or unlocked.');
    } else {
      alert(error.message);
    }
  } else {
    console.error('Unknown error occurred during transaction.');
    alert('An unknown error occurred. Please try again later.');
  }
};

export const contractABI = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  { inputs: [], name: 'AlreadyWithdrawn', type: 'error' },
  { inputs: [], name: 'InvalidSignature', type: 'error' },
  {
    inputs: [],
    name: 'deposit',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [ { internalType: 'uint256', name: 'amount', type: 'uint256' } ],
    name: 'depositToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address payable', name: 'owner', type: 'address' },
    ],
    name: 'emergencyReturn',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [ { internalType: 'address', name: 'token', type: 'address' } ],
    name: 'emergencyReturnToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [ { internalType: 'address', name: '', type: 'address' } ],
    name: 'nonces',
    outputs: [ { internalType: 'uint256', name: '', type: 'uint256' } ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [ { internalType: 'address', name: '_key', type: 'address' } ],
    name: 'setPublicKey',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_tokenAddress', type: 'address' },
    ],
    name: 'setTokenAddress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [ { internalType: 'address', name: '', type: 'address' } ],
    name: 'signaturesForWithdraw',
    outputs: [ { internalType: 'bool', name: '', type: 'bool' } ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'uint256', name: 'time', type: 'uint256' },
      { internalType: 'uint256', name: 'nonce', type: 'uint256' },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'uint256', name: 'time', type: 'uint256' },
      { internalType: 'uint256', name: 'nonce', type: 'uint256' },
      { internalType: 'bytes', name: 'signature', type: 'bytes' },
    ],
    name: 'withdrawTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

export function isProviderRpcError(error: unknown): error is ProviderRpcError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    'code' in error
  );
}
