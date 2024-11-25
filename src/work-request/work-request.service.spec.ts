import { Test, TestingModule } from '@nestjs/testing';
import { WorkRequestService } from './work-request.service';

import { User } from '../user/user.entity';
import { Employee } from '../employee/employee.entity';
import { EmployeeSlotSchedule } from '../employee-slot-schedule/employeeSlotSchedule.entity';
import { EmployeeBaseSchedule } from '../employee-base-schedule/employeeBaseSchedule.entity';
import { WorkRequest } from './workRequest.entity';
import { EmployeeWorkType } from '../employee-work-type/employeeWorkType.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

import { WorkStatus } from './status.enum';
import exp from 'constants';

describe('WorkRequestService', () => {
  let service: WorkRequestService;

  const mockUser = {
    findOne: jest.fn()
  }
  const mockEmployee = {}
  const mockEmployeeSlotSchedule = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn()
  }
  const mockEmployeeBaseSchedule = {
    findOne: jest.fn()
  }
  const mockWorkRequest = {
    findOne: jest.fn(),
    find: jest.fn(),
    findBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn()
  }
  const mockEmployeeWorkType = {
    findOne: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkRequestService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUser
        },
        {
          provide: getRepositoryToken(Employee),
          useValue: mockEmployee
        },
        {
          provide: getRepositoryToken(EmployeeSlotSchedule),
          useValue: mockEmployeeSlotSchedule
        },
        {
          provide: getRepositoryToken(EmployeeBaseSchedule),
          useValue: mockEmployeeBaseSchedule
        },
        {
          provide: getRepositoryToken(WorkRequest),
          useValue: mockWorkRequest
        },
        {
          provide: getRepositoryToken(EmployeeWorkType),
          useValue: mockEmployeeWorkType
        }
      ],
    }).compile();

    service = module.get<WorkRequestService>(WorkRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be create work request', async () => {
    const dataSlotShedule: Partial<EmployeeSlotSchedule> = {
      startDate: new Date('2024-11-25'),
      endDate: new Date('2024-11-25')
    }
    const employee: Employee = new Employee()
    employee.name = 'Tom'

    const employeeBaseSchedule: EmployeeBaseSchedule = new EmployeeBaseSchedule()
    employeeBaseSchedule.employee = employee

    const user: User = new User()
    user.email = "tom@mail.ru"

    const employeeWorkType: EmployeeWorkType = new EmployeeWorkType()

    const dataWorkRequest: Partial<WorkRequest> = {
      status: WorkStatus.WAITING,
      employeeSlotScheduleId: 1,
      userId: 1
    }

    mockUser.findOne.mockReturnValue(user)
    mockEmployeeBaseSchedule.findOne.mockReturnValue(employeeBaseSchedule)
    mockEmployeeWorkType.findOne.mockReturnValue(employeeWorkType)
    mockEmployeeSlotSchedule.find.mockReturnValue([])
    mockEmployeeSlotSchedule.create.mockResolvedValue(dataSlotShedule)
    mockEmployeeSlotSchedule.save.mockReturnValue('Success save')
    mockWorkRequest.create.mockReturnValue(dataWorkRequest)
    mockWorkRequest.save.mockReturnValue('Success save')

    const result = await service.getAvailableSlot(new Date('2024-11-25'), 1, 1)

    expect(result).toEqual('Заявка успешно создана')
    expect(mockUser.findOne).toHaveBeenCalled()
    expect(mockEmployeeBaseSchedule.findOne).toHaveBeenCalled()
    expect(mockEmployeeWorkType.findOne).toHaveBeenCalled()
    expect(mockEmployeeSlotSchedule.find).toHaveBeenCalled()
    expect(mockEmployeeSlotSchedule.create).toHaveBeenCalled()
    expect(mockEmployeeSlotSchedule.save).toHaveBeenCalled()
    expect(mockWorkRequest.create).toHaveBeenCalled()
    expect(mockWorkRequest.save).toHaveBeenCalled()
  })

  it('should be cancel request', async () => {
    const id = 1
    const workRequest: WorkRequest = new WorkRequest()
    mockWorkRequest.findOne.mockReturnValue(workRequest)
    mockWorkRequest.save.mockReturnValue('Success save')

    const result = await service.cancelRequest(id)

    expect(result).toEqual('Success save')
    expect(mockWorkRequest.findOne).toHaveBeenCalledWith({
      where: {
        id: id
      }
    })
  })

  it('should be find for admin', async () => {
    const workRequest: WorkRequest[] = [new WorkRequest]
    mockWorkRequest.find.mockReturnValue(workRequest)

    const result = await service.findAllRequest_admin()

    expect(result).toEqual(workRequest)
  })

  it('should be find for user', async () => {
    const userId = 1
    const workRequest: WorkRequest[] = [new WorkRequest]

    mockWorkRequest.findBy.mockReturnValue(workRequest)

    const result = await service.findAllRequest_user(userId)
    expect(result).toEqual(workRequest)
    expect(mockWorkRequest.findBy).toHaveBeenCalledWith({ userId: userId })
  })

  it('should be one request by id', async () => {
    const idRequest = 1
    const workRequest: WorkRequest[] = [new WorkRequest]

    mockWorkRequest.findOne.mockReturnValue(workRequest)

    const result = await service.findRequestById(idRequest)

    expect(result).toEqual(workRequest)
    expect(mockWorkRequest.findOne).toHaveBeenCalledWith({
      where: {
        id: idRequest
      }
    })
  })
});
