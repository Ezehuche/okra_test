import { Injectable } from '@nestjs/common';

const currency = {
  // eslint-disable-next-line prettier/prettier
  '$': 'USD',
  '₦': 'NGN',
};

@Injectable()
export class FormatterService {
  getCurrencySymbol(str: string) {
    return str.replace(/[\d\., ]/g, '');
  }

  getPrice(str: string) {
    return str.replace(/[^0-9\.-]+/g, '');
  }

  removeStr(unwanted: string, str: string) {
    return str.replaceAll(unwanted, '').trim();
  }

  removeMultiple(unwanted: string[], str: string) {
    unwanted.map((item) => {
      str.replaceAll(item, '').trim();
    });

    return str;
  }
}
