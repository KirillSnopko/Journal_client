import { Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/layouts/journal/dashboard/dashboard.component';

import { StudentListComponent } from '../journal/student/student-list/student-list.component';
import { StudentViewComponent } from '../journal/student/student-view/student-view.component';
import { StudentAddComponent } from '../journal/student/student-add/student-add.component';

import { SubjectListComponent } from '../journal/subject/subject-list/subject-list.component';
import { SubjectDetailsComponent } from '../journal/subject/subject-details/subject-details.component';
import { SubjectEditComponent } from '../journal/subject/subject-edit/subject-edit.component';
import { TopicsComponent } from '../journal/subject/topics/topics.component';


export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },

  { path: 'students', component: StudentListComponent },
  { path: 'students/add', component: StudentAddComponent },
  { path: 'students/view/:studentid', component: StudentViewComponent },

  { path: 'subjects', component: SubjectListComponent },
  { path: 'subjects/edit/:subjectid', component: SubjectEditComponent },
  { path: 'subjects/details/:subjectid', component: SubjectDetailsComponent },
  { path: 'subjects/gradelevel/:gradeid', component: TopicsComponent },

];

