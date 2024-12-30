import { Component } from '@angular/core';
import { InventoryService } from '../../../services/inventory.service';
import { Department, InventoryItem } from '../../../models';
import { ChartData } from 'chart.js';
import { CommonModule } from '@angular/common';
import { BarChartComponent } from '../../../components/bar-chart/bar-chart.component';

@Component({
  selector: 'app-invetory-bar-chart',
  imports: [CommonModule, BarChartComponent],
  templateUrl: './invetory-bar-chart.component.html',
  styleUrl: './invetory-bar-chart.component.scss',
})
export class InvetoryBarChartComponent {
  chartData: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.inventoryService
      .getInventoryData()
      .subscribe((departments: Department[]) => {
        this.prepareChartData(departments);
      });
  }

  private prepareChartData(departments: Department[]): void {
    // Extract department names and sum their stock
    const labels: string[] = [];
    const data: number[] = [];
    const backgroundColors: string[] = [
      '#FF6384', // Electronics
      '#36A2EB', // Raw Materials
      '#FFCE56', // Finished Goods
      '#4BC0C0', // Spare Parts
      '#9966FF', // Consumables
    ];

    departments.forEach((department, index) => {
      labels.push(department.name);
      const totalStock = department.inventory.reduce(
        (sum, item) => sum + item.stock,
        0
      );

      data.push(totalStock);
    });

    this.chartData = {
      labels,
      datasets: [
        {
          label: 'Total Stock per Department',
          data,
          backgroundColor: backgroundColors.slice(0, labels.length),
        },
      ],
    };
  }
}
