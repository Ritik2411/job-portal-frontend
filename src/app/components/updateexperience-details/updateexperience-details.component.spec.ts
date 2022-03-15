import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateexperienceDetailsComponent } from './updateexperience-details.component';

describe('UpdateexperienceDetailsComponent', () => {
  let component: UpdateexperienceDetailsComponent;
  let fixture: ComponentFixture<UpdateexperienceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateexperienceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateexperienceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
