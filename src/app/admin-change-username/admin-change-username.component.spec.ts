import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChangeUsernameComponent } from './admin-change-username.component';

describe('AdminChangeUsernameComponent', () => {
  let component: AdminChangeUsernameComponent;
  let fixture: ComponentFixture<AdminChangeUsernameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminChangeUsernameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminChangeUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
