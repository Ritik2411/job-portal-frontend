import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeerDetailComponent } from './add-employeer-detail.component';

describe('AddEmployeerDetailComponent', () => {
  let component: AddEmployeerDetailComponent;
  let fixture: ComponentFixture<AddEmployeerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployeerDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmployeerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
