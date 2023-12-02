import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentCustomerListComponent } from './agent-customer-list.component';

describe('AgentCustomerListComponent', () => {
  let component: AgentCustomerListComponent;
  let fixture: ComponentFixture<AgentCustomerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentCustomerListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgentCustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
