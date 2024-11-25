import { Test, TestingModule } from '@nestjs/testing';
import { UserWorkRequestController } from './user-work-request.controller';
import { WorkRequestService } from './work-request.service';

import { WorkRequest } from './workRequest.entity';

describe('UserWorkRequestController', () => {
  let controller: UserWorkRequestController;

  const mockWorkRequestService = {
    findAllRequest_user: jest.fn(),
    findRequestById: jest.fn(),
    getAvailableSlot: jest.fn(),
    cancelRequest: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserWorkRequestController],
      providers: [
        {
          provide: WorkRequestService,
          useValue: mockWorkRequestService
        }
      ],
    }).compile();

    controller = module.get<UserWorkRequestController>(UserWorkRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be find all request user', async () => {
    const userId = 1
    const workRequest: WorkRequest[] = [new WorkRequest()]

    mockWorkRequestService.findAllRequest_user.mockReturnValue(workRequest)
    const result = await controller.findAllRequest({ user: userId })

    expect(result).toEqual(workRequest)
  })

  it('should be find one request by id', async () => {
    const requestId = { workRequestId: 1 }
    const workRequest: WorkRequest = new WorkRequest()

    mockWorkRequestService.findRequestById.mockReturnValue(workRequest)

    const result = await controller.findOneRequest(requestId)

    expect(result).toEqual(workRequest)
  })

  it('should be create work request', async () => {
    const date = new Date('2024-25-11')
    const employeeWorkTypeId = 1
    const user = { userId: 1 }
    const workRequest: WorkRequest = new WorkRequest()

    mockWorkRequestService.getAvailableSlot.mockReturnValue(workRequest)

    const result = await controller.createWorkRequest({ date: date, employeeWorkTypeId: employeeWorkTypeId }, {user: user})
    
    expect(result).toEqual(workRequest)
  })
});

