import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeWorkTypeController } from './employee-work-type.controller';
import { EmployeeWorkTypeService } from './employee-work-type.service';

import { EmployeeWorkType } from './employeeWorkType.entity';
import { EmployeeType } from '../employee-type/employeeType.entity';
import { WorkRequest } from '../work-request/workRequest.entity';

describe('EmployeeWorkTypeController', () => {
  let controller: EmployeeWorkTypeController;

  const mockEmployeeWorkTypeService = {
    findAll: jest.fn(),
    createWorkType: jest.fn(),
    deleteWorkType: jest.fn(),
    patchWorkType: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeWorkTypeController],
      providers: [
        {
          provide: EmployeeWorkTypeService,
          useValue: mockEmployeeWorkTypeService
        }
      ],
    }).compile();

    controller = module.get<EmployeeWorkTypeController>(EmployeeWorkTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be find', async () => {
    const employeeWorkType: EmployeeWorkType[] = [
      {
        id: 1,
        title: "Mock Work Type",
        price: 500,
        workRequest: [new WorkRequest()],
        employeeType: [new EmployeeType]
      }
    ]
    mockEmployeeWorkTypeService.findAll.mockReturnValue(employeeWorkType)

    const result = await controller.findAllWorkType()

    expect(result).toEqual(employeeWorkType)
  })

  it('should be create', async () => {
    const data: Partial<EmployeeWorkType> = {
      title: "Mock Work Type",
      price: 500,
      workRequest: [new WorkRequest()],
      employeeType: [new EmployeeType]
    }

    mockEmployeeWorkTypeService.createWorkType.mockResolvedValue('Success create')

    const result = await controller.createWorkType(data)
    expect(result).toEqual('Success create')
  })

  it('should be delete', async () => {
    const id = 1
    mockEmployeeWorkTypeService.deleteWorkType.mockReturnValue("Success delete")

    const result = await controller.deleteWorkType({ id: id })
    expect(result).toEqual("Success delete")
  })

  it('should be update', async () => {
    const updateData = {
      id: 1,
      data: {
        title: "Mock Work Type",
        price: 500,
        workRequest: [new WorkRequest()],
        employeeType: [new EmployeeType]
      }
    }
    mockEmployeeWorkTypeService.patchWorkType.mockReturnValueOnce('Success update')

    const result = await controller.updateWorkType(updateData)

    expect(result).toEqual('Success update')
  })
});

