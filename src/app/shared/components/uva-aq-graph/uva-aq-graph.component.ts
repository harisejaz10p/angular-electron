import { Component, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { EnvironmentService } from '../../../core/services/environment/environment.service';

@Component({
  selector: 'uva-aq-graph',
  templateUrl: './uva-aq-graph.component.html',
  styleUrls: [ './uva-aq-graph.component.scss' ]
})
export class UvaAqGraphComponent implements OnChanges {
  @Input() measurand!: string
  @Input() label!: string
  @Input() data!: number[]
  @Input() labels!: string[]
  @Input() minValue: number = 0;
  @Input() maxValue: number = 100;

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [ 0 ],
        label: null,
        borderColor: '#708BB5',
        borderWidth: 1,
        pointRadius: 0,
      },
    ],
    labels: [new Date().toISOString()]
  };

  constructor(private environmentService: EnvironmentService) { 
    environmentService.environmentData[this.measurand] = this.lineChartData.datasets[0].data;
  }

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.2
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {
        display: false
      },
      y: {
        display: false,
        beginAtZero: true,
      }
    },
    animation: {
      duration: 0
    },

    plugins: {
      legend: { display: false },
    }
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    // console.log(event, active);
  }

  ngOnInit(): void {
    this.lineChartData.datasets[0].label = this.measurand
    this.lineChartOptions.scales.y.min = this.minValue
    this.lineChartOptions.scales.y.max = this.maxValue
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.lineChartData.datasets[0].data = this.data;
    this.lineChartData.labels = this.labels;
    this.chart?.update();
  }

}