import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

export const CourseLayoutRoutes: Routes = [
 /* { path: 'students', component: StudentListComponent },
  { path: 'students/profile/:studentid', component: StudentViewComponent },*/
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(CourseLayoutRoutes),
  ]
})



export class CourseLayoutModule { }
