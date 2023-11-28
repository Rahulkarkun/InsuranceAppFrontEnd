import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancePolicyListComponent } from './insurance-policy-list.component';

describe('InsurancePolicyListComponent', () => {
  let component: InsurancePolicyListComponent;
  let fixture: ComponentFixture<InsurancePolicyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsurancePolicyListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsurancePolicyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
