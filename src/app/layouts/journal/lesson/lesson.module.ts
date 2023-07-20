import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { LessonCreateDialogComponent } from './lesson-create-dialog/lesson-create-dialog.component';
import { LessonListComponent } from './lesson-list/lesson-list.component';
import { LessonViewComponent } from './lesson-view/lesson-view.component';

export const LessonLayoutRoutes: Routes = [
  { path: 'lessons', component: LessonListComponent },
  { path: 'lessons/details/:lessonid', component: LessonViewComponent },
];

@NgModule({
  declarations: [


    LessonListComponent,
    LessonViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(LessonLayoutRoutes),
    MatDialogModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatIconModule,
    MatTabsModule,
    MatBadgeModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,

    LessonCreateDialogComponent
  ]
})
export class LessonModule { }
