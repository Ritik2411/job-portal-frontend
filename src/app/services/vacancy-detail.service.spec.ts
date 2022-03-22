import { TestBed } from '@angular/core/testing';

import { VacancyDetailService } from './vacancy-detail.service';

describe('VacancyDetailService', () => {
  let service: VacancyDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacancyDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
