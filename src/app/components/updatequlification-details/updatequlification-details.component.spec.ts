import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatequlificationDetailsComponent } from './updatequlification-details.component';

describe('UpdatequlificationDetailsComponent', () => {
  let component: UpdatequlificationDetailsComponent;
  let fixture: ComponentFixture<UpdatequlificationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatequlificationDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatequlificationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
