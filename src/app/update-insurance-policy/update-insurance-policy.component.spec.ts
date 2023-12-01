import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInsurancePolicyComponent } from './update-insurance-policy.component';

describe('UpdateInsurancePolicyComponent', () => {
  let component: UpdateInsurancePolicyComponent;
  let fixture: ComponentFixture<UpdateInsurancePolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateInsurancePolicyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateInsurancePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
