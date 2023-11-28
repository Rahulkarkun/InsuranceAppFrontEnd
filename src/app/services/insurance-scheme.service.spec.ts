import { TestBed } from '@angular/core/testing';

import { InsuranceSchemeService } from './insurance-scheme.service';

describe('InsuranceSchemeService', () => {
  let service: InsuranceSchemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsuranceSchemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
