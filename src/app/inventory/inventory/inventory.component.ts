import { Component, ViewChild } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { InventoryTableComponent } from '../inventory-table/inventory-table.component';
import { MatTabsModule } from '@angular/material/tabs';
import { InvetoryBarChartComponent } from '../components/invetory-bar-chart/invetory-bar-chart.component';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MatButton } from '@angular/material/button';
import { Department } from '../../models';

@Component({
  selector: 'app-inventory',
  imports: [
    InventoryTableComponent,
    MatTabsModule,
    InvetoryBarChartComponent,
    BaseChartDirective,
  ],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss',
})
export class InventoryComponent {
  constructor(private inventoryService: InventoryService) {}

  ngOnInit() {
    this.inventoryService.getInventoryData().subscribe((data) => {
      console.log(data);
      data.forEach((department, index) => {
        department.inventory.forEach((inv, idx) => {
          this.lineChartData.datasets[index].data.push(
            data[index].inventory[idx].stock
          );
          if (this.lineChartData.datasets[index].data.length > 12 * 3) {
            this.lineChartData.datasets[index].data.shift();
          }
        });
      });
      const time = new Date();
      this.lineChartData.labels.push(
        time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
      );
      if (this.lineChartData.labels.length > 12) {
        this.lineChartData.labels.shift();
      }
      this.chart?.update();
    });
  }

  //line chart
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Electronics',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: [],
        label: 'Raw Materials',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      },
      {
        data: [],
        label: 'Finished Goods',
        yAxisID: 'y1',
        backgroundColor: 'rgba(30, 255, 0, 0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: [],
        label: 'Spare Parts',
        yAxisID: 'y1',
        backgroundColor: 'rgba(21, 0, 255, 0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: [],
        label: 'Consumables',
        yAxisID: 'y1',
        backgroundColor: 'rgba(255, 0, 76, 0.51)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: [],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        position: 'left',
      },
      y1: {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red',
        },
      },
    },

    plugins: {
      legend: { display: true },
    },
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
}
