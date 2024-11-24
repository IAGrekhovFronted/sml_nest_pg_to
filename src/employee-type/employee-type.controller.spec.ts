import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeTypeController } from './employee-type.controller';
import { EmployeeTypeService } from './employee-type.service';

import { Employee } from '../employee/employee.entity';
import { EmployeeType } from './employeeType.entity';
import { EmployeeWorkType } from '../employee-work-type/employeeWorkType.entity';

describe('EmployeeTypeController', () => {
  let controller: EmployeeTypeController;

  const mockEmployeeTypeService = {
    findAllEmployeeType: jest.fn(),
    createEmployeeType: jest.fn(),
    deletwEmployeeType: jest.fn(),
    updateEmployeeType: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeTypeController],
      providers: [
        {
          provide: EmployeeTypeService,
          useValue: mockEmployeeTypeService
        }
      ],
    }).compile();

    controller = module.get<EmployeeTypeController>(EmployeeTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be find all', async () => {
    const employeeType: EmployeeType[] = [
      {
        id: 1,
        title: "Test work",
        employee: [new Employee()],
        employeeWorkType: new EmployeeWorkType()
      }
    ]

    mockEmployeeTypeService.findAllEmployeeType.mockReturnValue(employeeType)

    const result = await controller.findAllEmployeeType()

    expect(result).toEqual(employeeType)
  })

  it('should be create', async () => {
    const data: Partial<EmployeeType> = {
      title: "Test work",
      employeeWorkType: Object.assign(new EmployeeWorkType(), { id: 1 })
    }

    const employeeType: EmployeeType =
    {
      id: 2,
      title: data.title,
      employee: [new Employee()],
      employeeWorkType: data.employeeWorkType
    }

    mockEmployeeTypeService.createEmployeeType.mockReturnValue(employeeType)

    const result = await controller.createEmployeeType(data)

    expect(result).toEqual(employeeType)
  })

  it('should be delete', async () => {
    const id = 1

    mockEmployeeTypeService.deletwEmployeeType.mockResolvedValue('Success delete')

    const result = await controller.deleteEmployeeType({ id: id })
    expect(result).toEqual('Success delete')
  })

  it('should be update', async () => {

    const data = {
      employeeTypeId: 1,
      employeeType: { title: "Mock" }
    }

    mockEmployeeTypeService.updateEmployeeType.mockResolvedValue("Success update")
    const result = await controller.updateEmployeeType(data)

    expect(result).toEqual("Success update")
  })
});

