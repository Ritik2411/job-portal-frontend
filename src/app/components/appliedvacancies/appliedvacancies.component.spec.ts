import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedvacanciesComponent } from './appliedvacancies.component';

describe('AppliedvacanciesComponent', () => {
  let component: AppliedvacanciesComponent;
  let fixture: ComponentFixture<AppliedvacanciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppliedvacanciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedvacanciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
