import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonCreateDialogComponent } from './lesson-create-dialog.component';

describe('LessonCreateDialogComponent', () => {
  let component: LessonCreateDialogComponent;
  let fixture: ComponentFixture<LessonCreateDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LessonCreateDialogComponent]
    });
    fixture = TestBed.createComponent(LessonCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
