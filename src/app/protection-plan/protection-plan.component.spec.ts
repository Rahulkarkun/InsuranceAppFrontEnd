import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtectionPlanComponent } from './protection-plan.component';

describe('ProtectionPlanComponent', () => {
  let component: ProtectionPlanComponent;
  let fixture: ComponentFixture<ProtectionPlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProtectionPlanComponent]
    });
    fixture = TestBed.createComponent(ProtectionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
