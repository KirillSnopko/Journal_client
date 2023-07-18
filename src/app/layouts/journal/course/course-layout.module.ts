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
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

import { CourseCreateDialogComponent } from './course-create-dialog/course-create-dialog.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseViewComponent } from './course-view/course-view.component';

export const CourseLayoutRoutes: Routes = [
  { path: 'courses', component: CourseListComponent },
  { path: 'courses/details/:courseid', component: CourseViewComponent },
];

@NgModule({
  declarations: [
    CourseListComponent,
    CourseViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CourseLayoutRoutes),
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

    CourseCreateDialogComponent
  ]
})



export class CourseLayoutModule { }
