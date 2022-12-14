import { PageRequest } from './page.request';

export class Page {
  isEnd: boolean;
  constructor(pageRequest: PageRequest, totalItemCount: number) {
    const currentPageNo = pageRequest.pageNo;
    const totalPageCount = Math.ceil(totalItemCount / pageRequest.pageSize);
    this.isEnd = currentPageNo === totalPageCount;
  }
}
