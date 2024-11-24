import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeWorkTypeService } from './employee-work-type.service';
import { EmployeeWorkType } from './employeeWorkType.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

import { WorkRequest } from '../work-request/workRequest.entity';
import { EmployeeType } from '../employee-type/employeeType.entity';

describe('EmployeeWorkTypeService', () => {
  let service: EmployeeWorkTypeService;

  const mockEmployeeWorkType = {
    find: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeWorkTypeService,
        {
          provide: getRepositoryToken(EmployeeWorkType),
          useValue: mockEmployeeWorkType
        }
      ],
    }).compile();

    service = module.get<EmployeeWorkTypeService>(EmployeeWorkTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
    mockEmployeeWorkType.find.mockReturnValue(employeeWorkType)
    const result = await service.findAll()

    expect(result).toEqual(employeeWorkType)
  })

  it('should be create', async () => {
    const data: Partial<EmployeeWorkType> = {
      title: "Mock Work Type",
      price: 500,
      workRequest: [new WorkRequest()],
      employeeType: [new EmployeeType]
    }

    mockEmployeeWorkType.create.mockReturnValue(data)
    mockEmployeeWorkType.save.mockResolvedValue("Success save")

    const result = await service.createWorkType(data)
    expect(result).toEqual("Success save")
    expect(mockEmployeeWorkType.create).toHaveBeenCalledWith(data)
  })

  it('should be delete', async () => {
    const id = 1
    mockEmployeeWorkType.delete.mockResolvedValue('Success delete')

    const result = await service.deleteWorkType(id)

    expect(result).toEqual('Success delete')
  })

  it('should be update', async () => {
    const id = 1
    const data: Partial<EmployeeWorkType> = {
      title: "Mock Work Type",
      price: 500,
      workRequest: [new WorkRequest()],
      employeeType: [new EmployeeType]
    }
    mockEmployeeWorkType.update.mockResolvedValue('Update success')
    const result = await service.patchWorkType(id, data)

    expect(result).toEqual('Update success')
  })
});

