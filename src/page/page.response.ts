import { Page } from './page';
import { PageRequest } from './page.request';

export class PageResponse<T> {
  pagination: Page;
  contents: T;
  constructor(pageRequest: PageRequest, totalItemCount: number, contents: T) {
    this.pagination = new Page(pageRequest, totalItemCount);
    this.contents = contents;
  }
}
