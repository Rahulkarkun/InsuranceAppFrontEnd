import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerClaimListFilterComponent } from './customer-claim-list-filter.component';

describe('CustomerClaimListFilterComponent', () => {
  let component: CustomerClaimListFilterComponent;
  let fixture: ComponentFixture<CustomerClaimListFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerClaimListFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerClaimListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
