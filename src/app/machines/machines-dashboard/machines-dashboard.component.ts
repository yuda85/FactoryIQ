import { Component, ViewChild } from '@angular/core';
import { MachinesService } from '../../services/machines.service';
import { Subscription } from 'rxjs';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
// import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js'/;
// import { BaseChartDirective } from 'ng2-charts';
import { MatButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { Department, IPieChart } from '../../models';
import { PieComponent } from '../../components/pie/pie.component';
// import { Department } from '../../models/machine.interface';
// import { ChartHostComponent } from '../chart-host/chart-host.component';

@Component({
  selector: 'app-machines-dashboard',
  imports: [BaseChartDirective, MatButton, MatDivider, PieComponent],
  templateUrl: './machines-dashboard.component.html',
  styleUrl: './machines-dashboard.component.scss',
})
export class MachinesDashboardComponent {
  constructor(private machineService: MachinesService) {}

  private sub: Subscription = new Subscription();

  ngOnInit() {
    this.sub.add(
      this.machineService.getMachinesData().subscribe((data: Department[]) => {
        data.forEach((department) => {
          if (department.id === 1) {
            const machinesObj = {};

            department.machines.forEach((machine) => {
              if (machinesObj[machine.status]) {
                machinesObj[machine.status]++;
              } else {
                machinesObj[machine.status] = 1;
              }
            });

            console.log('Mapped Data', machinesObj);

            this.pieChartData = {
              labels: Object.keys(machinesObj),
              datasets: [
                {
                  data: Object.values(machinesObj),
                },
              ],
            };

            // this.pieChartData.labels = Object.keys(machinesObj);
            // this.pieChartData.datasets[0].data = Object.values(machinesObj);
          }
        });

        console.log(data);
      })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // Pie
  public pieChartOptions: any = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
    },
  };
  public pieChartData: IPieChart = {
    labels: ['Running', 'Idle', 'Under Maintenance'],
    datasets: [
      {
        data: [300, 500, 100],
      },
    ],
  };
}
