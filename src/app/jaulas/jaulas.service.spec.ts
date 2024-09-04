import { TestBed } from '@angular/core/testing';

import { JaulasService } from './jaulas.service';

describe('JaulasService', () => {
  let service: JaulasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JaulasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
