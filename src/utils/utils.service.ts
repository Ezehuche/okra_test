import { Injectable } from '@nestjs/common';
import { UpdateUtilDto } from './dto/update-util.dto';
import { AccountsService } from '../account/accounts.service';
import { TransactionsService } from '../transactions/transactions.service';

type authType = {
  email: string;
  password: string;
};

type customerType = {
  user_id: string;
  name: string;
  address: string;
  bvn: string;
  email: string;
  phone_number: string;
};

type accountType = {
  user_id: string;
  customer_id: string;
  _id: string;
  type: string;
  accountBalance: string;
  currency: string;
  ledgerBalance: string;
};

type transactionType = {
  account_id: string;
  type: string;
  clearedDate: Date;
  description: string;
  amount: string;
  currency: string;
  beneficiary: string;
  sender: string;
};

export interface ScrapeLogs {
  auth: authType;
  customer: customerType;
  accounts: accountType;
  transactions: transactionType;
}

@Injectable()
export class UtilsService {
  constructor(
    private accounts: AccountsService,
    // private customers: CustomersService,
    private transactions: TransactionsService,
  ) {}
  snakeCase(text: string) {
    return text
      .replace(/\W+/g, ' ')
      .split(/ |\B(?=[A-Z])/)
      .map((word) => word.toLowerCase())
      .join('_');
  }

  getFloat(value: any) {
    return value && value['$numberDecimal'] ? value['$numberDecimal'] : 0;
  }

  findAll() {
    return `This action returns all utils`;
  }

  detectObject(obj: any) {
    if (Object.prototype.toString.call(obj) === '[object Object]') {
      return true;
    }
    return false;
  }

  propertyNameConverter(converterFn: (s: string) => string) {
    (data: any): { [key: string]: any } => {
      const recursive = (obj: any): any => {
        if (!this.detectObject(data)) {
          return data;
        }
        const keys = Object.keys(obj);
        return keys.reduce(
          (accum: { [key: string]: any }, propName: string) => {
            const propValue = obj[propName];
            return {
              ...accum,
              [converterFn(propName)]: Array.isArray(propValue)
                ? propValue.map((x) =>
                    this.detectObject(x) ? recursive(x) : x,
                  )
                : this.detectObject(propValue)
                ? recursive(propValue)
                : propValue,
            };
          },
          {},
        );
      };
      return recursive(data);
    };
  }

  public toSnake = this.propertyNameConverter(this.snakeCase);

  toSnakeCase(obj: any) {
    const newObj: any = {};
    for (const key in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        const keyCamel = this.snakeCase(key);
        newObj[keyCamel] = value;
      }
    }
    return newObj;
  }

  findOne(id: number) {
    return `This action returns a #${id} util`;
  }

  update(id: number, updateUtilDto: UpdateUtilDto) {
    return `This action updates a #${id} util`;
  }

  remove(id: number) {
    return `This action removes a #${id} util`;
  }

  async errorHandler(error, res) {
    res.status(error.response.status || 400).json({
      status: false,
      message:
        error.response.data.message || error.request.messaged || 'Failed',
      data: error.response.data || error.request || error.message,
    });
  }

  sendObjectResponse(message: string, data?: any) {
    return {
      status: true,
      message,
      data: data,
    };
  }
}
