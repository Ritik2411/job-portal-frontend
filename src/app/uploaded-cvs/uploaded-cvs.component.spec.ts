import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedCVsComponent } from './uploaded-cvs.component';

describe('UploadedCVsComponent', () => {
  let component: UploadedCVsComponent;
  let fixture: ComponentFixture<UploadedCVsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadedCVsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadedCVsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
