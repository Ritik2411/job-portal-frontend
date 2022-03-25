import { TestBed } from '@angular/core/testing';

import { VacancydetailService } from './vacancydetail.service';

describe('VacancydetailService', () => {
  let service: VacancydetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacancydetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
