import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from 'src/app/layouts/journal/dashboard/dashboard.component';
import { StudentListComponent } from '../journal/student/student-list/student-list.component';
import { StudentViewComponent } from '../journal/student/student-view/student-view.component';
import { StudentAddComponent } from '../journal/student/student-add/student-add.component';

import { SubjectListComponent } from '../journal/subject/subject-list/subject-list.component';
import { SubjectDetailsComponent } from '../journal/subject/subject-details/subject-details.component';
import { SubjectEditComponent } from '../journal/subject/subject-edit/subject-edit.component';


import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';

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
  ],
  declarations: [
    DashboardComponent,
    StudentListComponent,
    StudentViewComponent,
    StudentAddComponent,

    SubjectListComponent,
    SubjectDetailsComponent,
    SubjectEditComponent,
  ]
})

export class AdminLayoutModule { }
