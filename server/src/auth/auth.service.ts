import { Injectable } from '@nestjs/common';
import { verifyMessage } from 'ethers';

@Injectable()
export class AuthService {
  verifySignature(
    message: string,
    signature: string,
    address: string,
  ): boolean {
    const recoveredAddress = verifyMessage(message, signature);
    return recoveredAddress.toLowerCase() === address.toLowerCase();
  }
}
