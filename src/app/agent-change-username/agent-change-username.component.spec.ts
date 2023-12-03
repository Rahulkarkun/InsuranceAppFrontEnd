import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentChangeUsernameComponent } from './agent-change-username.component';

describe('AgentChangeUsernameComponent', () => {
  let component: AgentChangeUsernameComponent;
  let fixture: ComponentFixture<AgentChangeUsernameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentChangeUsernameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgentChangeUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
