import { Controller, Post, Delete, Patch, Get, Body, Param, UseGuards } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/authentication/role.guard';

@Controller('employee')
@UseGuards(AuthGuard('jwt'), new RolesGuard(['Admin']))
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) { }

  @Get('find')
  async findAllEmployee() {
    return this.employeeService.findEmployee()
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
