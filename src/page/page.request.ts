import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class PageRequest {
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    default: 1,
  })
  pageNo?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    default: 15,
  })
  pageSize?: number;

  constructor(pageNo: number, pageSize: number) {
    this.pageNo =
      pageNo < 1 || pageNo === undefined || pageNo === null ? 1 : pageNo;
    this.pageSize =
      pageSize < 1 || pageSize === undefined || pageSize === null
        ? 15
        : pageSize;
  }

  getOffset(): number {
    if (this.pageNo < 1 || this.pageNo === undefined || this.pageNo === null) {
      this.pageNo = 1;
    }

    if (
      this.pageSize < 1 ||
      this.pageSize === undefined ||
      this.pageSize === null
    ) {
      this.pageSize = 15;
    }

    return (this.pageNo - 1) * this.pageSize;
  }

  getLimit(): number {
    if (
      this.pageSize < 1 ||
      this.pageSize === undefined ||
      this.pageSize === null
    ) {
      this.pageSize = 15;
    }
    return this.pageSize;
  }
}
