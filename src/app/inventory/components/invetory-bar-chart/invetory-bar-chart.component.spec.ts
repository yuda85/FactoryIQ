import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvetoryBarChartComponent } from './invetory-bar-chart.component';

describe('InvetoryBarChartComponent', () => {
  let component: InvetoryBarChartComponent;
  let fixture: ComponentFixture<InvetoryBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvetoryBarChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvetoryBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
