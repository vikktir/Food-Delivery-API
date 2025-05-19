import { ConflictException } from '@nestjs/common';

export class OrderAlreadyProcessedException extends ConflictException {
  constructor() {
    super('Order has already been processed.');
  }
}
