import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Routes } from '@angular/router';

import { DashboardComponent } from 'src/app/layouts/journal/dashboard/dashboard.component';
import { StudentLayoutModule } from '../journal/student/student-layout.module';
import { SubjectLayoutModule } from '../journal/subject/subject-layout.module';
import { CourseLayoutModule } from '../journal/course/course-layout.module';
import { DeleteDialogComponent } from '../common/delete-dialog/delete-dialog.component';


export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatIconModule, MatMenuModule,

    StudentLayoutModule,
    SubjectLayoutModule,
    CourseLayoutModule,
    DeleteDialogComponent
  ],
  declarations: [
    DashboardComponent,
  ]
})

export class AdminLayoutModule { }
