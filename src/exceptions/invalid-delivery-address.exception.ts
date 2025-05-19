import { BadRequestException } from '@nestjs/common';

export class InvalidDeliveryAddressException extends BadRequestException {
  constructor() {
    super('The provided delivery address is invalid.');
  }
}