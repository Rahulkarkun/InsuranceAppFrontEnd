import { TestBed } from '@angular/core/testing';

import { CommissionWithdrawalService } from './commission-withdrawal.service';

describe('CommissionWithdrawalService', () => {
  let service: CommissionWithdrawalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommissionWithdrawalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
