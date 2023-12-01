import { TestBed } from '@angular/core/testing';

import { SchemedetailsService } from './schemedetails.service';

describe('SchemedetailsService', () => {
  let service: SchemedetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchemedetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
