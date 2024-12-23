import { Component } from '@angular/core';
import { MachinesService } from '../../../services/machines.service';
import { filter, map, Subscription } from 'rxjs';
import { Department } from '../../../models';
import { ActivatedRoute } from '@angular/router';
import { BarChartComponent } from '../../../components/bar-chart/bar-chart.component';
import { CommonModule } from '@angular/common';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-machines',
  imports: [CommonModule, BarChartComponent],
  templateUrl: './machines.component.html',
  styleUrl: './machines.component.scss',
})
export class MachinesComponent {
  constructor(
    private machineService: MachinesService,
    private activatedRoute: ActivatedRoute
  ) {}
  private sub: Subscription = new Subscription();

  public barChartData: ChartData<'bar'>;
  public charts: Array<ChartData<'bar'>> = [];
  ngOnInit() {
    const departmentName = this.activatedRoute.snapshot.params['department'];

    this.sub.add(
      this.machineService
        .getMachinesData()
        .pipe(
          map((data) => {
            const depIndex = data.findIndex((department) => {
              return department.name === departmentName;
            });
            return data[depIndex];
          })
        )
        .subscribe((data: Department) => {
          console.log(data);
          const mappedData = {
            labels: [],
            datasets: [{ data: [], label: '' }],
          };

          data.machines.forEach((machine) => {
            mappedData.labels = Object.keys(machine.metrics);
            const machineData = {
              data: Object.keys(machine.metrics).map((key) => {
                return machine.metrics[key];
              }),
              label: machine.name,
            };

            mappedData.datasets = [machineData];
            this.charts = [];
            this.charts.push(mappedData);
            console.log(this.charts);
          });
          // this.barChartData = mappedData;

          // {
          //   labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
          //   datasets: [
          //     { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
          //     { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
          //   ],
          // };
        })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
