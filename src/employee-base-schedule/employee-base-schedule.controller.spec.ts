import { Test } from "@nestjs/testing";
import { EmployeeBaseScheduleController } from "./employee-base-schedule.controller";
import { EmployeeBaseScheduleService } from "./employee-base-schedule.service";

import { EmployeeBaseSchedule } from "./employeeBaseSchedule.entity";
import { Employee } from "../employee/employee.entity";

describe('EmployeeBaseScheduleController', () => {

  const mockEmployeeBaseScheduleService = {
    findEmployeeBaseSchedule: jest.fn(),
    createEmployeeBaseSchedule: jest.fn(),
    deleteEmployeeBaseSchedule: jest.fn(),
    updateEmployeeBaseShedule: jest.fn()
  }

  let service: EmployeeBaseScheduleService
  let controller: EmployeeBaseScheduleController

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [EmployeeBaseScheduleController],
      providers: [
        {
          provide: EmployeeBaseScheduleService,
          useValue: mockEmployeeBaseScheduleService
        }
      ]
    }).compile()

    service = module.get<EmployeeBaseScheduleService>(EmployeeBaseScheduleService)
    controller = module.get<EmployeeBaseScheduleController>(EmployeeBaseScheduleController)
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(controller).toBeDefined()
  })

  it('should be find', async () => {
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

    mockEmployeeBaseScheduleService.findEmployeeBaseSchedule.mockReturnValue(employeeBaseSchedule)

    const result = await controller.findEmployeeBaseShedule()

    expect(result).toEqual(employeeBaseSchedule)
  })

  it('should be create', async () => {
    const data: Partial<EmployeeBaseSchedule> =
    {
      start: new Date('2024-10-1'),
      end: new Date('2024-10-2')
    }

    const newBaseShedule: EmployeeBaseSchedule = Object.assign(new EmployeeBaseSchedule(),
      {
        start: data.start,
        end: data.end,
        employee: Object.assign(new Employee(), { id: data.employee })
      }
    )

    mockEmployeeBaseScheduleService.createEmployeeBaseSchedule.mockResolvedValue(newBaseShedule)

    const result = await controller.createEmployeeBaseShedule(data)

    expect(result).toEqual(newBaseShedule)
  })

  it('should be delete', async () => {
    const id = { id: 1 }
    mockEmployeeBaseScheduleService.deleteEmployeeBaseSchedule.mockResolvedValue('Success delete')

    const result = await controller.deleteEmployeeBaseShedule(id)

    expect(result).toEqual('Success delete')
  })

  it('should be update', async () => {
    const data = {
      id: 1,
      shedule: {
        start: new Date('2024-10-1'),
        end: new Date('2024-10-2'),
        employee: Object.assign(new Employee(), { id: 2 })
      }
    }

    mockEmployeeBaseScheduleService.updateEmployeeBaseShedule.mockResolvedValue('Success update')

    const result = await controller.updateEmployeeBaseShedule(data)

    expect(result).toEqual('Success update')
  })
})

