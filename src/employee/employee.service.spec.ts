import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employee.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { EmployeeType } from '../employee-type/employeeType.entity';
import { Repository } from 'typeorm';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let employeeRepository: Repository<Employee>;
  let employeeTypeRepository: Repository<EmployeeType>;

  const mockEmployeeRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  };

  const mockEmployeeTypeRepository = {
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        {
          provide: getRepositoryToken(Employee),
          useValue: mockEmployeeRepository,
        },
        {
          provide: getRepositoryToken(EmployeeType),
          useValue: mockEmployeeTypeRepository,
        },
      ],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
    employeeRepository = module.get<Repository<Employee>>(getRepositoryToken(Employee));
    employeeTypeRepository = module.get<Repository<EmployeeType>>(getRepositoryToken(EmployeeType));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findEmployee', () => {
    it('should return an array of employees', async () => {
      const result = [{ id: 1, name: 'John Doe' }];
      mockEmployeeRepository.find.mockResolvedValue(result);
      
      expect(await service.findEmployee()).toBe(result);
      expect(mockEmployeeRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('createEmployee', () => {
    it('should create a new employee', async () => {
      const employeeId = 1;
      const employeeData: Partial<Employee> = { name: 'New Employee' };
      const employeeType = { id: employeeId, description: 'Admin' };

      mockEmployeeTypeRepository.findOneBy.mockResolvedValue(employeeType);
      mockEmployeeRepository.create.mockReturnValue(employeeData);
      mockEmployeeRepository.save.mockResolvedValue(employeeData);

      const result = await service.createEmployee(employeeId, employeeData);
      
      expect(result).toEqual(employeeData);
      expect(mockEmployeeTypeRepository.findOneBy).toHaveBeenCalledWith({ id: employeeId });
      expect(mockEmployeeRepository.create).toHaveBeenCalledWith({ ...employeeData, type: employeeType });
      expect(mockEmployeeRepository.save).toHaveBeenCalledWith(employeeData);
    });
  });

  describe('deleteEmployee', () => {
    it('should delete an employee', async () => {
      const employeeId = { id: 1 };
      mockEmployeeRepository.delete.mockResolvedValue(undefined);

      const result = await service.deleteEmployee(employeeId);
      
      expect(result).toEqual(`Сотрудник с id ${employeeId.id} удален`);
      expect(mockEmployeeRepository.delete).toHaveBeenCalledWith(employeeId);
    });
  });

  describe('patchEmployee', () => {
    it('should update an employee', async () => {
      const idEmployee = 1;
      const idEmployeeType = 2;
      const employeeData: Partial<Employee> = { name: 'Updated Employee' };
      const employeeType = { id: idEmployeeType, description: 'User' };

      mockEmployeeTypeRepository.findOneBy.mockResolvedValue(employeeType);
      mockEmployeeRepository.update.mockResolvedValue(undefined);

      await service.patchEmployee(idEmployee, idEmployeeType, employeeData);

      expect(mockEmployeeTypeRepository.findOneBy).toHaveBeenCalledWith({ id: idEmployeeType });
      expect(mockEmployeeRepository.update).toHaveBeenCalledWith(idEmployee, { ...employeeData, type: employeeType });
    });
  });
});