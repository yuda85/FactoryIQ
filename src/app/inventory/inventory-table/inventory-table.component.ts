import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { MatTableDataSource } from '@angular/material/table';
import { InventoryService } from '../../services/inventory.service';
import { Department } from '../../models';

@Component({
  selector: 'app-inventory-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.scss'],
})
export class InventoryTableComponent implements OnInit {
  inventoryItems: {
    department: string;
    name: string;
    stock: number;
    reorderLevel: number;
    status: string;
  }[] = [];

  dataSource = new MatTableDataSource(this.inventoryItems);
  displayedColumns: string[] = [
    'department',
    'name',
    'stock',
    'reorderLevel',
    'status',
  ];

  isLoading = true;
  filterValue: string = '';

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private inventoryService: InventoryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.inventoryService
      .getInventoryData()
      .subscribe((departments: Department[]) => {
        this.inventoryItems = departments.flatMap((department) =>
          department.inventory.map((item) => ({
            department: department.name,
            name: item.name,
            stock: item.stock,
            reorderLevel: item.reorderLevel,
            status: item.status,
          }))
        );
        this.dataSource.data = this.inventoryItems;
        this.isLoading = false;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showAlert(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  exportToCSV(): void {
    const csvData = this.convertToCSV(this.inventoryItems);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'inventory_data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  private convertToCSV(data: any[]): string {
    const headers = [
      'Department',
      'Item Name',
      'Stock',
      'Reorder Level',
      'Status',
    ];
    const csvRows = data.map(
      (item) =>
        `${item.department},${item.name},${item.stock},${item.reorderLevel},${item.status}`
    );
    return [headers.join(','), ...csvRows].join('\n');
  }
}
