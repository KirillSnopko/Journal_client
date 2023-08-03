import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectUpdateDialogComponent } from './subject-update-dialog.component';

describe('SubjectUpdateDialogComponent', () => {
  let component: SubjectUpdateDialogComponent;
  let fixture: ComponentFixture<SubjectUpdateDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubjectUpdateDialogComponent]
    });
    fixture = TestBed.createComponent(SubjectUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
