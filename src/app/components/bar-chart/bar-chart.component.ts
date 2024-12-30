import { Component, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  imports: [BaseChartDirective],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss',
})
export class BarChartComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective<'bar'> | undefined;

  private _chartData: ChartData<'bar'> = { labels: [], datasets: [] };

  @Input() set chartData(chartData: ChartData<'bar'>) {
    this._chartData = chartData;
    this.chart?.update();
  }

  get chartData(): ChartData<'bar'> {
    return this._chartData;
  }

  public barChartType: ChartConfiguration<'bar'>['type'] = 'bar';

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Departments',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Total Stock Levels',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
}
