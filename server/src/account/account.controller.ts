import { Controller, Get, NotFoundException, Query } from '@nestjs/common';
import { AccountService } from '@/account/account.service';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get()
  async getAccount(@Query('address') address: string) {
    const account = await this.accountService.findOne(address);

    if (!account) {
      throw new NotFoundException(`Account not found`);
    }

    return account;
  }
}
