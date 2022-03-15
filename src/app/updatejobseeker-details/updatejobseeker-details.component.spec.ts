import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatejobseekerDetailsComponent } from './updatejobseeker-details.component';

describe('UpdatejobseekerDetailsComponent', () => {
  let component: UpdatejobseekerDetailsComponent;
  let fixture: ComponentFixture<UpdatejobseekerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatejobseekerDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatejobseekerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
