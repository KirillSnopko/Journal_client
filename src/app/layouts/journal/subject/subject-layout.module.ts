import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SubjectListComponent } from './subject-list/subject-list.component';
import { SubjectDetailsComponent } from './subject-details/subject-details.component';
import { SubjectEditComponent } from './subject-edit/subject-edit.component';
import { TopicsComponent } from './topics/topics.component';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { Routes } from '@angular/router';

export const SubjectLayoutRoutes: Routes = [
  { path: 'subjects', component: SubjectListComponent },
  { path: 'subjects/edit/:subjectid', component: SubjectEditComponent },
  { path: 'subjects/details/:subjectid', component: SubjectDetailsComponent },
  { path: 'subjects/gradelevel/:gradeid', component: TopicsComponent },
];

@NgModule({
  declarations: [
    SubjectListComponent,
    SubjectDetailsComponent,
    SubjectEditComponent,
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
  ]
})
export class SubjectLayoutModule { }
