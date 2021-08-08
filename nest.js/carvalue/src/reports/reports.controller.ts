import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/users/decorators/custom-user.decorator';
import { Serialize } from '../interceptors/serialize.interceptor';
import { GetEstimateDto } from './../users/dtos/get-estimate.dto';
import { AdminGuard } from './../users/guards/admin.guard';
import { AuthGuard } from './../users/guards/auth.guard';
import { User } from './../users/user.entity';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportDto } from './dtos/report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
@UseGuards(AuthGuard)
@Serialize(ReportDto)
export class ReportsController {
  constructor(private reportsService: ReportsService) {}
  @Post()
  @UseGuards(AuthGuard)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }

  @Get()
  getEstimate(@Query() query: GetEstimateDto) {
    return this.reportsService.createEstimate(query);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return this.reportsService.changeApproved(id, body.approved);
  }
}
