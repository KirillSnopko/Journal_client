import { Component, OnInit } from '@angular/core';
import { ApiRoutes } from 'src/app/http/api-routes';
import { HttpProviderService } from 'src/app/http/provider/http-provider.service';
import { Lesson } from 'src/app/models/lesson/lesson';

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.css']
})
export class LessonListComponent implements OnInit {
  lessons: Lesson[] = [];

  constructor(
    private provider: HttpProviderService,
  ) { }

  ngOnInit(): void {
    this.getLessons();
  }

  getLessons() {
    this.provider.setUrl(ApiRoutes.lesson.toString())
      .getList().subscribe((data: any) => {
        this.lessons = data.body;
      },
        (error: any) => {
          if (error) {
            if (error.status == 404) {
              if (error.error && error.error.message) {
                this.lessons = [];
              }
            }
          }
        });
  }

  unPrepared() {
    return this.lessons.filter(less => !less.isPrepared);
  }

  unTaskGiven() {
    return this.lessons.filter(less => !less.isTaskGiven);
  }

  noGrade() {
    return this.lessons.filter(less => less.gradeHome==0||less.gradeLesson==0);
  }

  unPaid() {
    return this.lessons.filter(less => !less.isPaid);
  }
}
