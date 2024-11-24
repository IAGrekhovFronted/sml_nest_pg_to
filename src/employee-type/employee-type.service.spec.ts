import { Test } from "@nestjs/testing";
import { EmployeeTypeService } from "./employee-type.service";

import { EmployeeType } from "./employeeType.entity";
import { EmployeeWorkType } from "../employee-work-type/employeeWorkType.entity";
import { Employee } from "../employee/employee.entity";
import { WorkRequest } from "../work-request/workRequest.entity";

import { getRepositoryToken } from "@nestjs/typeorm";

describe('EmployeeTypeService', () => {
  let service: EmployeeTypeService

  const mockEmployeeType = {
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    update: jest.fn()
  }
  const mockEmployeeWorkType = {
    findOneBy: jest.fn()
  }

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        EmployeeTypeService,

        {
          provide: getRepositoryToken(EmployeeType),
          useValue: mockEmployeeType
        },
        {
          provide: getRepositoryToken(EmployeeWorkType),
          useValue: mockEmployeeWorkType
        }
      ]
    }).compile()

    service = module.get<EmployeeTypeService>(EmployeeTypeService)
  })

  afterAll(() =>
    jest.clearAllMocks()
  )

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should be find', async () => {
    const employeeType: EmployeeType[] = [
      {
        id: 1,
        title: "Test work",
        employee: [new Employee()],
        employeeWorkType: new EmployeeWorkType()
      }
    ]
    mockEmployeeType.find.mockReturnValue(employeeType)

    const result = await service.findAllEmployeeType()

    expect(result).toEqual(employeeType)
  })

  it('should be create', async () => {

    const employeeTypeId = 1
    const data: Partial<EmployeeType> = {
      title: "Test work",
    }

    const findEmployeeWorkType: EmployeeWorkType = {
      id: employeeTypeId,
      title: "Mock Employee Work Type",
      price: 500,
      employeeType: [new EmployeeType()],
      workRequest: [new WorkRequest()]
    }

    const employeeType: EmployeeType =
    {
      id: 2,
      title: data.title,
      employee: [new Employee()],
      employeeWorkType: findEmployeeWorkType
    }

    mockEmployeeWorkType.findOneBy.mockReturnValue(findEmployeeWorkType)
    mockEmployeeType.create.mockReturnValue(employeeType)
    mockEmployeeType.save.mockResolvedValue(employeeType)

    const result = await service.createEmployeeType(employeeTypeId, data)

    expect(result).toMatchObject(
      {
        id: 2,
        title: data.title,
        employee: [new Employee()],
        employeeWorkType: findEmployeeWorkType
      }
    )
    expect(mockEmployeeWorkType.findOneBy).toHaveBeenCalledWith({ id: employeeTypeId })
    expect(mockEmployeeType.create).toHaveBeenCalledWith(data)
    expect(mockEmployeeType.save).toHaveBeenCalledWith(employeeType)
  })

  it('should be delete', async () => {
    const id = 1
    mockEmployeeType.delete.mockResolvedValue('Success delete')

    const result = await service.deletwEmployeeType(id)

    expect(result).toEqual('Success delete')
  })

  it('should be update', async () => {
    const id = 1
    const data: Partial<EmployeeType> = {
      title: "Test work",
    }

    mockEmployeeType.update.mockResolvedValue('Success update')

    const result = await service.updateEmployeeType(id, data)

    expect(result).toEqual('Success update')
  })
})
