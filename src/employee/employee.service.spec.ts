import { Test, TestingModule } from "@nestjs/testing";
import { EmployeeService } from "./employee.service";
import { Employee } from "./employee.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { EmployeeType } from "../employee-type/employeeType.entity";
import exp from "constants";

describe('EmployeeService', () => {

  const mockEmployeeRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    update: jest.fn()
  }

  const mockEmployeeTypeRepository = {
    findOneBy: jest.fn()
  }

  let employeeService: EmployeeService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        {
          provide: getRepositoryToken(Employee),
          useValue: mockEmployeeRepository
        },
        {
          provide: getRepositoryToken(EmployeeType),
          useValue: mockEmployeeTypeRepository
        },

      ]
    }).compile()

    employeeService = module.get<EmployeeService>(EmployeeService)
  })

  afterAll(async () => {
    jest.clearAllMocks();
  })

  it('should be defined', () => {
    expect(employeeService).toBeDefined()
  })

  it('should be find all employee', async () => {
    const employee = [
      {
        id: 1,
        name: "Test #1",
        type: 1
      },
      {
        id: 2,
        name: "Test #2",
        type: 2
      }
    ]

    mockEmployeeRepository.find.mockResolvedValue(employee)
    const result = await employeeService.findEmployee()

    expect(result).toEqual(employee)
  })

  it('should be create employee', async () => {

    const createdEmployee = new Employee()
    const partialEmployee: Partial<Employee> = { name: "Моковый сотрудник" }
    const findEmployeeType = new EmployeeType()
    createdEmployee.name = partialEmployee.name
    createdEmployee.type = findEmployeeType

    mockEmployeeTypeRepository.findOneBy.mockResolvedValue(findEmployeeType)
    mockEmployeeRepository.create.mockReturnValue(createdEmployee)
    mockEmployeeRepository.save.mockResolvedValue(createdEmployee)

    const result = await employeeService.createEmployee(1, partialEmployee)

    expect(result).toEqual(expect.objectContaining({
      name: partialEmployee.name,
      type: findEmployeeType,
    }));

    expect(mockEmployeeTypeRepository.findOneBy).toHaveBeenCalledWith({ id: 1 })
    expect(mockEmployeeRepository.create).toHaveBeenCalledWith(partialEmployee)
    expect(mockEmployeeRepository.save).toHaveBeenCalledWith(createdEmployee)
  })

  it('should be delete employee', async () => {
    const id = { id: 1 }
    mockEmployeeRepository.delete.mockReturnValue(`Сотрудник с id ${id.id} удален`)

    const result = await employeeService.deleteEmployee(id)

    expect(result).toEqual(`Сотрудник с id ${id.id} удален`)
  })

  it('should be update employee', async () => {
    const mockPatch = {
      EmployeeId: 1,
      EmployeeType: 2,
      UpdateData: { name: 'Моковый сотрудник' }
    }

    mockEmployeeTypeRepository.findOneBy.mockResolvedValue(mockPatch.EmployeeType)
    mockEmployeeRepository.update.mockReturnValue('Сотрудник успешно обновлен')

    const result = await employeeService.patchEmployee(mockPatch.EmployeeId, mockPatch.EmployeeType, mockPatch.UpdateData)

    expect(result).toEqual('Сотрудник успешно обновлен')
    expect(mockEmployeeTypeRepository.findOneBy).toHaveBeenCalledWith({ id: mockPatch.EmployeeType })
    expect(mockEmployeeRepository.update).toHaveBeenCalledWith(mockPatch.EmployeeId, mockPatch.UpdateData)
  })
})