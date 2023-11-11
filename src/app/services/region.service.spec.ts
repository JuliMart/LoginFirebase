import { TestBed } from '@angular/core/testing';

import { RegionesService } from './region.service';

describe('RegionService', () => {
  let service: RegionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
