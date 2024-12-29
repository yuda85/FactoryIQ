import { Component } from '@angular/core';
import { InventoryService } from '../inventory.service';

@Component({
  selector: 'app-inventory',
  imports: [],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss',
})
export class InventoryComponent {
  constructor(private inventoryService: InventoryService) {}

  ngOnInit() {
    this.inventoryService.getInventoryData().subscribe((data) => {
      console.log(data);
    });
  }
}
