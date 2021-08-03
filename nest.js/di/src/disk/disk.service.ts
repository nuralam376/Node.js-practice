import { Injectable } from '@nestjs/common';
import { PowerService } from './../power/power.service';

@Injectable()
export class DiskService {
  constructor(private powerService: PowerService) {}

  getData(): string {
    console.log('Drawing 20 watts of power');
    this.powerService.supplyPower(20);
    return 'draw!';
  }
}
