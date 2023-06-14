import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectDeleteComponent } from './subject-delete.component';

describe('SubjectDeleteComponent', () => {
  let component: SubjectDeleteComponent;
  let fixture: ComponentFixture<SubjectDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubjectDeleteComponent]
    });
    fixture = TestBed.createComponent(SubjectDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
