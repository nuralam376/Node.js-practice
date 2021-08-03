import { Injectable } from '@nestjs/common';
import { PowerService } from './../power/power.service';

@Injectable()
export class CpuService {
  constructor(private powerService: PowerService) {}

  compute(a: number, b: number): number {
    console.log(`Drawing ${a + b} watts of power`);
    const sum = a + b;
    this.powerService.supplyPower(sum);
    return sum;
  }
}
