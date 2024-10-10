import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '@/account/entities/account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {
  private readonly logger = new Logger(AccountService.name);

  constructor(
    @InjectRepository(Account)
    private accountRepo: Repository<Account>,
  ) {}

  findOne(address: string) {
    return this.accountRepo.findOne({
      where: { externalAddress: address },
    });
  }
}
