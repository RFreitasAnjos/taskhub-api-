import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth/auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@UseGuards(AuthGuard, RolesGuard)
@Controller('admin')
export class AdminController {
  
  @Get('users')
  @Roles('Admin')
  getAllUsers() {
    return ['user1', 'user2'];
  }
}
