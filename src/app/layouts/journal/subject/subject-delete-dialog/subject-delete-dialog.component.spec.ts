import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectDeleteDialogComponent } from './subject-delete-dialog.component';

describe('SubjectDeleteDialogComponent', () => {
  let component: SubjectDeleteDialogComponent;
  let fixture: ComponentFixture<SubjectDeleteDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubjectDeleteDialogComponent]
    });
    fixture = TestBed.createComponent(SubjectDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
