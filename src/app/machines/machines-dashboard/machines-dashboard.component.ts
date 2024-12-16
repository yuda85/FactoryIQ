import { Component } from '@angular/core';
import { MachinesService } from '../../services/machines.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-machines-dashboard',
  imports: [],
  templateUrl: './machines-dashboard.component.html',
  styleUrl: './machines-dashboard.component.scss',
})
export class MachinesDashboardComponent {
  constructor(private machineService: MachinesService) {}

  private sub: Subscription = new Subscription();

  ngOnInit() {
    this.sub.add(
      this.machineService.getMachinesData().subscribe((data) => {
        console.log(data);
      })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
