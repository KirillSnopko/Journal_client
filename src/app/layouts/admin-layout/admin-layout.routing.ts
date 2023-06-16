import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/layouts/journal/dashboard/dashboard.component';

import { StudentListComponent } from '../journal/student/student-list/student-list.component';
import { StudentViewComponent } from '../journal/student/student-view/student-view.component';
import { StudentAddComponent } from '../journal/student/student-add/student-add.component';

import { SubjectListComponent } from '../journal/subject/subject-list/subject-list.component';


export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },

  { path: 'students', component: StudentListComponent },
  { path: 'students/add', component: StudentAddComponent },
  { path: 'students/view/:studentid', component: StudentViewComponent },

  { path: 'subjects', component: SubjectListComponent },
  
];

