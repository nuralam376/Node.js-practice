import { Module } from '@nestjs/common';
import { DiskModule } from 'src/disk/disk.module';
import { CpuModule } from './../cpu/cpu.module';
import { ComputerController } from './computer.controller';

@Module({
  controllers: [ComputerController],
  imports: [DiskModule, CpuModule],
})
export class ComputerModule {}
