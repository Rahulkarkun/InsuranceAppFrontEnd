import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInsurancePlanComponent } from './update-insurance-plan.component';

describe('UpdateInsurancePlanComponent', () => {
  let component: UpdateInsurancePlanComponent;
  let fixture: ComponentFixture<UpdateInsurancePlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateInsurancePlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateInsurancePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
