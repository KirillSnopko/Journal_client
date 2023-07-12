import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SubjectListComponent } from './subject-list/subject-list.component';
import { SubjectDetailsComponent } from './subject-details/subject-details.component';
import { TopicsComponent } from './topics/topics.component';
import { SubjectCreateDialogComponent } from './subject-create-dialog/subject-create-dialog.component';
import { SubjectUpdateDialogComponent } from './subject-update-dialog/subject-update-dialog.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { Routes } from '@angular/router';
import { SubjectDeleteDialogComponent } from './subject-delete-dialog/subject-delete-dialog.component';


export const SubjectLayoutRoutes: Routes = [
  { path: 'subjects', component: SubjectListComponent },
  { path: 'subjects/details/:subjectid', component: SubjectDetailsComponent },
  { path: 'subjects/gradelevel/:gradeid', component: TopicsComponent },
];

@NgModule({
  declarations: [
    SubjectListComponent,
    SubjectDetailsComponent,
    TopicsComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(SubjectLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule,

    SubjectCreateDialogComponent,
    SubjectUpdateDialogComponent,
    SubjectDeleteDialogComponent,
  ]
})
export class SubjectLayoutModule { }
