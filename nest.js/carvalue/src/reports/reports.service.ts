import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetEstimateDto } from './../users/dtos/get-estimate.dto';
import { User } from './../users/user.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}
  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto);
    report.user = user;
    return this.repo.save(report);
  }

  async changeApproved(id: string, approved: boolean) {
    const report = await this.repo.findOne(id);

    if (!report) {
      throw new NotFoundException('Report not found');
    }
    report.approved = approved;
    console.log('Report', report);
    return this.repo.save(report);
  }

  async createEstimate(query: GetEstimateDto) {
    console.log('Query', query.make);
    return this.repo
      .createQueryBuilder()
      .select('*')
      .where('make = :make', { make: query.make })
      .getRawMany();
  }
}
