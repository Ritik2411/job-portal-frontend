import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployedetailmodalComponent } from './employedetailmodal.component';

describe('EmployedetailmodalComponent', () => {
  let component: EmployedetailmodalComponent;
  let fixture: ComponentFixture<EmployedetailmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployedetailmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployedetailmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
