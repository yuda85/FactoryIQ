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
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// import { Department } from '../../models/machine.interface';
// import { ChartHostComponent } from '../chart-host/chart-host.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MachinesTableComponent } from '../components/machines-table/machines-table.component';

@Component({
  selector: 'app-machines-dashboard',
  imports: [
    PieComponent,
    CommonModule,
    RouterModule,
    MatTabsModule,
    MachinesTableComponent,
  ],
  templateUrl: './machines-dashboard.component.html',
  styleUrl: './machines-dashboard.component.scss',
})
export class MachinesDashboardComponent {
  constructor(private machineService: MachinesService) {}

  private sub: Subscription = new Subscription();

  public chartsData: { [key: string]: IPieChart } = {};
  public departmentsData: Department[];

  ngOnInit() {
    const colors = ['#9BD0F5', '#973838', '#565099'];
    this.sub.add(
      this.machineService.getMachinesData().subscribe((data: Department[]) => {
        this.departmentsData = data;
        data.forEach((department) => {
          const machinesObj = {};

          department.machines.forEach((machine) => {
            if (machinesObj[machine.status]) {
              machinesObj[machine.status]++;
            } else {
              machinesObj[machine.status] = 1;
            }
          });

          // console.log('Mapped Data', machinesObj);

          this.pieChartData = {
            labels: Object.keys(machinesObj),
            // labels: ['Running', 'Idle', 'Under Maintenance'],
            datasets: [
              // {
              //   label: Object.keys(machinesObj)[0],
              //   data: Object.values(machinesObj),
              //   borderColor: '#36A2EB',
              //   backgroundColor: '#9BD0F5',
              // },
              // {
              //   label: Object.keys(machinesObj)[1],
              //   data: Object.values(machinesObj),
              //   borderColor: '#36A2EB',
              //   backgroundColor: '#9BD0F5',
              // },
              // {
              //   label: Object.keys(machinesObj)[2],
              //   data: Object.values(machinesObj),
              //   borderColor: '#36A2EB',
              //   backgroundColor: '#9BD0F5',
              // },
              {
                data: Object.values(machinesObj),
                backgroundColor: colors,
              },
            ],
          };

          this.chartsData[department.name] = this.pieChartData;

          // this.pieChartData.labels = Object.keys(machinesObj);
          // this.pieChartData.datasets[0].data = Object.values(machinesObj);
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
  public pieChartData: any = {
    labels: ['Running', 'Idle', 'Under Maintenance'],
    datasets: [
      {
        data: [300, 500, 100],
      },
    ],
  };
}
