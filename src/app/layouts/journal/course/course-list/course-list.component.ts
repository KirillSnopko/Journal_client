import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiRoutes } from 'src/app/http/api-routes';
import { HttpProviderService } from 'src/app/http/provider/http-provider.service';
import { DeleteDialogComponent } from 'src/app/layouts/common/delete-dialog/delete-dialog.component';
import { Course } from 'src/app/models/course/course';
import '@angular/common/locales/global/ru';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];

  constructor(
    private provider: HttpProviderService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses() {
    this.provider.setUrl(ApiRoutes.course.toString())
      .getList().subscribe((data: any) => {
        this.courses = data.body;
      },
        (error: any) => {
          if (error) {
            if (error.status == 404) {
              if (error.error && error.error.message) {
                this.courses = [];
              }
            }
          }
        });
  }

  deleteDialog(course: Course) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, { data: { id: course.id, name: course.title + " (c занятиями)", route: ApiRoutes.course.toString() } });
    dialogRef.afterClosed().subscribe(result => {
      this.getCourses();
    });
  }
}
