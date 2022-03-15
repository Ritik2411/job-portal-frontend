import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QulificationDetailsComponent } from './qulification-details.component';

describe('QulificationDetailsComponent', () => {
  let component: QulificationDetailsComponent;
  let fixture: ComponentFixture<QulificationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QulificationDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QulificationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
