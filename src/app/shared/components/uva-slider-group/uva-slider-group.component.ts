import { Component, Input, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { DeviceService } from '../../../core/services/device/device.service';

@Component({
  selector: 'uva-slider-group',
  templateUrl: './uva-slider-group.component.html',
  styleUrls: ['./uva-slider-group.component.scss']
})
export class UvaSliderGroupComponent implements OnInit {
  @Input() measurand!: string
  @Input() min!: string
  @Input() max!: string
  @Input() step!: string
  @Input() value!: number
  @Input() label: string
  @Input() deviceId: string

  constructor(private deviceService: DeviceService) { }

  ngOnInit(): void {
  }

  onInputChange(event: MatSliderChange): void {
    console.log(`[SLIDER GROUP] - ${this.measurand}, ${this.value}`)
    // this.deviceService.setMeasurandValue(this.measurand, event.value)
    this.deviceService.setMeasurandValue(this.measurand, this.value)
  }

}
