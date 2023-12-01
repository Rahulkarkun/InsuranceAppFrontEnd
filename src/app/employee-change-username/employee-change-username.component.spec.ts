import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeChangeUsernameComponent } from './employee-change-username.component';

describe('EmployeeChangeUsernameComponent', () => {
  let component: EmployeeChangeUsernameComponent;
  let fixture: ComponentFixture<EmployeeChangeUsernameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeChangeUsernameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeChangeUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
