import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionWithdrawalComponent } from './commission-withdrawal.component';

describe('CommissionWithdrawalComponent', () => {
  let component: CommissionWithdrawalComponent;
  let fixture: ComponentFixture<CommissionWithdrawalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommissionWithdrawalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommissionWithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
