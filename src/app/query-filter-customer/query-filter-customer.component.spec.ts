import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryFilterCustomerComponent } from './query-filter-customer.component';

describe('QueryFilterCustomerComponent', () => {
  let component: QueryFilterCustomerComponent;
  let fixture: ComponentFixture<QueryFilterCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueryFilterCustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QueryFilterCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
