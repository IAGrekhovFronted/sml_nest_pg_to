import { Test } from "@nestjs/testing";
import { EmployeeController } from "./employee.controller";
import { EmployeeService } from "./employee.service";
import { Employee } from "./employee.entity";
import { EmployeeType } from "../employee-type/employeeType.entity";

const mockEmployeeService = {
  findEmployee: jest.fn(),
  createEmployee: jest.fn(),
  deleteEmployee: jest.fn(),
  patchEmployee: jest.fn()
}

describe('EmployeeController', () => {
  let controller: EmployeeController
  let service: EmployeeService

  beforeEach(
    async () => {
      const module = await Test.createTestingModule({
        controllers: [EmployeeController],
        providers: [
          {
            provide: EmployeeService,
            useValue: mockEmployeeService
          }
        ]
      }).compile()

      controller = module.get<EmployeeController>(EmployeeController)
      service = module.get<EmployeeService>(EmployeeService)
    }
  )

  afterAll(
    () => jest.clearAllMocks()
  )

  it('should be defined', () => {
    expect(controller).toBeDefined()
    expect(service).toBeDefined()
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
    mockEmployeeService.findEmployee.mockReturnValue(employee)

    const result = await controller.findAllEmployee()

    expect(result).toEqual(employee)
  })

  it('should be create employee', async () => {
    const createdEmployee = new Employee()
    const partialEmployee: Partial<Employee> = { name: "Моковый сотрудник", type: new EmployeeType }
    createdEmployee.name = partialEmployee.name
    createdEmployee.type = partialEmployee.type

    mockEmployeeService.createEmployee.mockReturnValue(createdEmployee)

    const result = await controller.createEmployee(partialEmployee)

    expect(result).toMatchObject({
      name: createdEmployee.name,
      type: createdEmployee.type
    })
  })

  it('should be delete employee', async () => {
    const id = { id: 1 }
    mockEmployeeService.deleteEmployee.mockReturnValue(`Сотрудник с id ${id.id} удален`)

    const result = await controller.deleteEmployee(id)

    expect(result).toEqual(`Сотрудник с id 1 удален`)
  })

  it('should be update', async () => {
    const id = 1
    const partialEmployee: Partial<Employee> = { name: "Моковый сотрудник", type: new EmployeeType() }

    mockEmployeeService.patchEmployee.mockReturnValue('Сотрудник успешно обновлен')

    const result = await controller.patchEmployee(id, partialEmployee)

    expect(result).toEqual('Сотрудник успешно обновлен')
  })
})

