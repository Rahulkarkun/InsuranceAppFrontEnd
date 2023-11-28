import { TestBed } from '@angular/core/testing';

import { ShemedetailsService } from './schemedetails.service';

describe('ShemedetailsService', () => {
  let service: ShemedetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShemedetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
