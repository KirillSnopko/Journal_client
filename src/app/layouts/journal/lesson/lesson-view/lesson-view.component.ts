import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import 'moment/locale/ru';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core'
import { DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import * as moment from 'moment';

import { ApiRoutes } from 'src/app/http/api-routes';
import { HttpProviderService } from 'src/app/http/provider/http-provider.service';
import { Course } from 'src/app/models/course/course';
import { Topic } from 'src/app/models/topic/topic';
import { Lesson } from 'src/app/models/lesson/lesson';


@Component({
  selector: 'app-lesson-view',
  templateUrl: './lesson-view.component.html',
  styleUrls: ['./lesson-view.component.css']
})
export class LessonViewComponent implements OnInit {
  id:any;
  lesson: Lesson = {} as Lesson;
  topics: Topic[] = [];
  updateLesson = this.fb.group({
    topicList: [[], Validators.required],
    task: [""],
    description: [""],
    date: [Validators.required],
    time: ["17:00", Validators.required],
    price: [0],
    lessonDuration: [0],
  });

  constructor(
    private provider: HttpProviderService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private _adapter: DateAdapter<any>,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['lessonid'];
    this.getLesson();
    this._adapter.setLocale("ru");
  }

  getLesson() {
    this.provider.setUrl(ApiRoutes.lesson.toString())
      .get(this.id).subscribe((data: any) => {
        this.lesson = data.body as Lesson;
        this.getTopics(data.body.gradeLevel.id);
      },
        (error: any) => {
          if (error) {
            if (error.status == 404) {
              if (error.error && error.error.message) {
                this.lesson = {} as Lesson;
              }
            }
          }
        });
  }

  update() {
  /*  var dto: CourseUpdate = new CourseUpdate();
    dto.type = this.upForm.value.type!;
    dto.dateOfStart = new DatePipe('en-US').transform(this.course.dateOfStart, 'YYYY-MM-dd');
    dto.dateOfFinish = new DatePipe('en-US').transform(this.course.dateOfFinish, 'YYYY-MM-dd');
    dto.price = this.upForm.value.price!;
    dto.lessonDuration = this.upForm.value.lessonDuration!;
    dto.description = this.upForm.value.description!;
    dto.gradeLevelId = this.course.gradeLevel.id;
    console.log(dto);

    this.provider.setUrl(ApiRoutes.course.toString())
      .update(dto, this.id)
      .subscribe(async data => {
        if (data.status == 200) {
          setTimeout(() => {
            this.getCourse();
          }, 500);
          this.toastr.success("Обновлено!");
        }
      },
        async error => {
          this.toastr.error(error.error.message);
        });*/
  }

  private getTopics(gradeId: any) {
    this.provider.setUrl(ApiRoutes.lesson.toString() + this.lesson.id + ApiRoutes.topics.toString())
      .getList().subscribe((data: any) => {
        this.topics = data.body;
      },
        (error: any) => {
          if (error) {
            if (error.status == 404) {
              if (error.error && error.error.message) {
                this.topics = [];
              }
            }
          }
        });
  }

  
}
