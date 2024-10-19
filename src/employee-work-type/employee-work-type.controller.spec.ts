import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeWorkTypeController } from './employee-work-type.controller';
import { EmployeeWorkTypeService } from './employee-work-type.service';

describe('EmployeeWorkTypeController', () => {
  let controller: EmployeeWorkTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeWorkTypeController],
      providers: [EmployeeWorkTypeService],
    }).compile();

    controller = module.get<EmployeeWorkTypeController>(EmployeeWorkTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
