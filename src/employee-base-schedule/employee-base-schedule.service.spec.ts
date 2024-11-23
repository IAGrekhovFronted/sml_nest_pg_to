import { Test } from "@nestjs/testing";
import { EmployeeBaseScheduleService } from "./employee-base-schedule.service";
import { EmployeeBaseSchedule } from './employeeBaseSchedule.entity';
import { Employee } from '../employee/employee.entity';
import { getRepositoryToken } from "@nestjs/typeorm";
import { start } from "repl";

describe('EmployeeBaseScheduleService', () => {
  let service: EmployeeBaseScheduleService

  const mockRepositoryEmployeeBaseSchedule = {
    find: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    update: jest.fn()
  }
  const mockRepositoryEmployee = {
    findOneBy: jest.fn()
  }

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        EmployeeBaseScheduleService,
        {
          provide: getRepositoryToken(EmployeeBaseSchedule),
          useValue: mockRepositoryEmployeeBaseSchedule
        },
        {
          provide: getRepositoryToken(Employee),
          useValue: mockRepositoryEmployee
        }
      ]
    }).compile()

    service = module.get<EmployeeBaseScheduleService>(EmployeeBaseScheduleService)
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should be find base shedule', async () => {
    const employeeBaseSchedule: EmployeeBaseSchedule[] = [
      {
        id: 1,
        employee: new Employee,
        start: new Date('2024-11-24'),
        end: new Date('2024-11-25')
      },
      {
        id: 2,
        employee: new Employee,
        start: new Date('2024-11-23'),
        end: new Date('2024-11-24')
      }
    ]
    mockRepositoryEmployeeBaseSchedule.find.mockResolvedValue(employeeBaseSchedule)

    const result = await service.findEmployeeBaseSchedule()

    expect(result).toEqual(employeeBaseSchedule)
  })

  it('should be create base shedule', async () => {
    const id = 1
    const data: Partial<EmployeeBaseSchedule> =
    {
      start: new Date('2024-10-1'),
      end: new Date('2024-10-2')
    }

    const findEmployee: Employee = new Employee()
    data.employee = findEmployee

    mockRepositoryEmployee.findOneBy.mockReturnValue(findEmployee)
    mockRepositoryEmployeeBaseSchedule.save.mockReturnValue(data)

    const result = await service.createEmployeeBaseSchedule(id, data)

    expect(result).toMatchObject({
      start: new Date('2024-10-1'),
      end: new Date('2024-10-2'),
      employee: findEmployee
    })
    expect(mockRepositoryEmployee.findOneBy).toHaveBeenCalledWith({ id: id })
    expect(mockRepositoryEmployeeBaseSchedule.save).toHaveBeenCalledWith(data)
  })

  it('should be delete base shedule', async () => {
    const id = 1
    mockRepositoryEmployeeBaseSchedule.delete.mockResolvedValue('Delete Success')

    const result = await service.deleteEmployeeBaseSchedule(id)

    expect(result).toEqual('Delete Success')
  })

  it('should be update base shedule', async () => {
    const id = 1
    const data: Partial<EmployeeBaseSchedule> =
    {
      start: new Date('2024-10-1'),
      end: new Date('2024-10-2')
    }

    mockRepositoryEmployeeBaseSchedule.update.mockResolvedValue(data)

    const result = await service.updateEmployeeBaseShedule(id, data)

    expect(result).toEqual(data)
  })
})

