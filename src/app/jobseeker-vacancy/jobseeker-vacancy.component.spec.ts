import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobseekerVacancyComponent } from './jobseeker-vacancy.component';

describe('JobseekerVacancyComponent', () => {
  let component: JobseekerVacancyComponent;
  let fixture: ComponentFixture<JobseekerVacancyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobseekerVacancyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobseekerVacancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
