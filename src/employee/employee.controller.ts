import { 
  Controller, 
  Post,
  Get, 
  Delete, 
  Patch, 
  Body, 
  Param } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.entity';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) { }

  @Get('findAll')
  async findAllEmployee() {
    return this.employeeService.findAllEmployee()
  }

  @Post('create')
  async createEmployee(@Body() data: Partial<Employee>) {
    return await this.employeeService.createEmployee(data.type, data)
  }

  @Delete('delete')
  async deleteEmployee(@Body() id: { id: number }) {
    return await this.employeeService.deleteEmployee(id)
  }

  @Patch("patch/:id")
  async patchEmployee(
    @Param('id') idEmployee: number,
    @Body() data: Partial<Employee>) {
    const idEmployeeType = data.type
    
    return await this.employeeService.patchEmployee(idEmployee, idEmployeeType, data)
  }
}
