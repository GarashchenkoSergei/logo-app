import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

// implement user authentication to improve security
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('verify')
  async verifyAccount(
    @Body('message') message: string,
    @Body('signature') signature: string,
    @Body('address') address: string,
  ) {
    const isValid = this.authService.verifySignature(
      message,
      signature,
      address,
    );

    return { isValid };
  }
}
