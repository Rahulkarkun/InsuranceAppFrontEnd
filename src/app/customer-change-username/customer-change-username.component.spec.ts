import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerChangeUsernameComponent } from './customer-change-username.component';

describe('CustomerChangeUsernameComponent', () => {
  let component: CustomerChangeUsernameComponent;
  let fixture: ComponentFixture<CustomerChangeUsernameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerChangeUsernameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerChangeUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
