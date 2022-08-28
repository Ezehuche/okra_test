import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import * as randomstring from 'randomstring';
import { UsersService } from 'src/users/users.service';
import { AppService } from 'src/app.service';

@Injectable()
export class UserSeed {
  userService: any;
  userBulkService: any;
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
  ) {}

  @Command({
    command: 'insert:user',
    describe: 'insert users',
  })
  async insert(): Promise<void> {
    try {
      const id = `${randomstring.generate({
        length: 12,
        capitalization: 'lowercase',
        charset: 'alphanumeric',
      })}`;

      await this.appService.register({
        firstName: 'superadmin',
        lastName: 'test',
        email: 'superadmin@mail.com',
        password: 'aaAA@@123444',
        _id: id,
      });
    } catch (err: any) {
      throw new Error(err.message);
    }

    return;
  }
}
