import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CourseCreateDialogComponent } from './course-create-dialog/course-create-dialog.component';

export const CourseLayoutRoutes: Routes = [
  /* { path: 'students', component: StudentListComponent },
   { path: 'students/profile/:studentid', component: StudentViewComponent },*/
];

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CourseLayoutRoutes),
    MatDialogModule,
    MatButtonModule, MatStepperModule, MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule,


    CourseCreateDialogComponent
  ]
})



export class CourseLayoutModule { }
