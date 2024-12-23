import { Component } from '@angular/core';
import { MachinesService } from '../../../services/machines.service';
import { map, Subscription } from 'rxjs';
import { Department } from '../../../models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-machines',
  imports: [],
  templateUrl: './machines.component.html',
  styleUrl: './machines.component.scss',
})
export class MachinesComponent {
  constructor(
    private machineService: MachinesService,
    private activatedRoute: ActivatedRoute
  ) {}
  private sub: Subscription = new Subscription();
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
        })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
