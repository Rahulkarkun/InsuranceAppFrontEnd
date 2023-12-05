import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionWithdrawalListComponent } from './commission-withdrawal-list.component';

describe('CommissionWithdrawalListComponent', () => {
  let component: CommissionWithdrawalListComponent;
  let fixture: ComponentFixture<CommissionWithdrawalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommissionWithdrawalListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommissionWithdrawalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
