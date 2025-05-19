import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from '../entities/orders.entity';
import { LoggerService } from '../logger/logger.service';

type OrderStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELED';

describe('OrdersService', () => {
  let ordersService: OrdersService;

  const mockOrderRepository = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(order => Promise.resolve({ id: 1, ...order })),
    find: jest.fn().mockResolvedValue([]),
    findOneBy: jest.fn().mockImplementation(id => Promise.resolve({ id: 1 })),
    remove: jest.fn().mockResolvedValue(true)
  };

  const mockLoggerService = {
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(Order),
          useValue: mockOrderRepository,
        },
        {
          provide: LoggerService,
          useValue: mockLoggerService,
        },
      ],
    }).compile();

    ordersService = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(ordersService).toBeDefined();
  });

  it('should create an order', async () => {
    const orderDto = {
      costumerName: 'Test User',
      items: ['Item 1'],
      address: 'Test Address',
      totalAmount: 100,
      status: 'PENDING' as OrderStatus
    };

    const result = await ordersService.createOrder(orderDto);

    expect(result).toEqual({
      id: 1,
      ...orderDto
    });
    expect(mockOrderRepository.create).toHaveBeenCalledWith(orderDto);
    expect(mockOrderRepository.save).toHaveBeenCalled();
    expect(mockLoggerService.log).toHaveBeenCalled();
  });

  it('should return all orders', async () => {
    const mockOrders = [
      {
        id: 1,
        costumerName: 'Test User',
        items: ['Item 1'],
        address: 'Test Address',
        totalAmount: 100,
        status: 'PENDING' as OrderStatus
      }
    ];

    mockOrderRepository.find.mockResolvedValueOnce(mockOrders);

    const result = await ordersService.getAllOrders();

    expect(result).toEqual(mockOrders);
    expect(mockOrderRepository.find).toHaveBeenCalled();
  });
});