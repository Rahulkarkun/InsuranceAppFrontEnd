import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceAccountFilterComponent } from './insurance-account-filter.component';

describe('InsuranceAccountFilterComponent', () => {
  let component: InsuranceAccountFilterComponent;
  let fixture: ComponentFixture<InsuranceAccountFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsuranceAccountFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsuranceAccountFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
