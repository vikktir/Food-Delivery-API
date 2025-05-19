import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class RoundPricePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value?.totalAmount) {
      value.totalAmount = Math.round(value.totalAmount * 100) / 100;
    }
    return value;
  }
}
