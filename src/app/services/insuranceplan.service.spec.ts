import { TestBed } from '@angular/core/testing';

import { InsuranceplanService } from './insuranceplan.service';

describe('InsuranceplanService', () => {
  let service: InsuranceplanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsuranceplanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
