import { Test, TestingModule } from '@nestjs/testing';
import { AccessTokenStrategyService } from './access-token.strategy';

describe('AccessTokenStrategyService', () => {
  let service: AccessTokenStrategyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccessTokenStrategyService],
    }).compile();

    service = module.get<AccessTokenStrategyService>(AccessTokenStrategyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
