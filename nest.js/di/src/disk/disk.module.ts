import { Module } from '@nestjs/common';
import { PowerModule } from './../power/power.module';
import { DiskService } from './disk.service';

@Module({
  providers: [DiskService],
  imports: [PowerModule],
  exports: [DiskService],
})
export class DiskModule {}
