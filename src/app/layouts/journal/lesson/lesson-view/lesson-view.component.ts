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
import { LessonUpdate } from 'src/app/models/lesson/lesson-update';


@Component({
  selector: 'app-lesson-view',
  templateUrl: './lesson-view.component.html',
  styleUrls: ['./lesson-view.component.css']
})
export class LessonViewComponent implements OnInit {
  id: any;
  lesson: Lesson = {} as Lesson;
  topics: Topic[] = [];
  selectedTopics: number[] = [];
  updateLesson = this.fb.group({
    topicList: [this.selectedTopics, Validators.required],
    task: [""],
    description: [""],
    date: [this.lesson.date, Validators.required],
    time: ["17:00", Validators.required],
    price: [0],
    lessonDuration: [0],
    isPaid: [false],
    isPrepared: [false],
    isTaskGiven: [false],
    isCompleted: [false],
    isCanceled: [false],
    gradeHome: [0],
    gradeLesson: [0],
    dateOfPayment: [this.lesson.dateOfPayment]
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
        this.selectedTopics = this.lesson.topics.map(i => i.id);
        this.getTopics();
        this.setDataToForm();
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
    var dto: LessonUpdate = this.getDateFromForm();

    this.provider.setUrl(ApiRoutes.lesson.toString())
      .update(dto, this.id)
      .subscribe(async data => {
        if (data.status == 200) {
          setTimeout(() => {
            this.getLesson();
          }, 500);
          this.toastr.success("Обновлено!");
        }
      },
        async error => {
          this.toastr.error(error.error.message);
        });
  }

  private getTopics() {
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

  private setDataToForm() {
    this.updateLesson.setValue({
      topicList: this.selectedTopics,
      task: this.lesson.task,
      description: this.lesson.description,
      date: this.lesson.date,
      time: moment(this.lesson.date).format("HH:mm"),

      isPaid: this.lesson.isPaid,
      price: this.lesson.price,
      dateOfPayment: this.lesson.dateOfPayment,
      lessonDuration: this.lesson.lessonDuration,

      isPrepared: this.lesson.isPrepared,
      isTaskGiven: this.lesson.isTaskGiven,
      isCompleted: this.lesson.isCompleted,
      isCanceled: this.lesson.isCanceled,

      gradeHome: this.lesson.gradeHome,
      gradeLesson: this.lesson.gradeLesson,
    });
  }


  private getDateFromForm() {
    var dto: LessonUpdate = {} as LessonUpdate;

    dto.topics = this.updateLesson.value.topicList!.map((i) => { return this.topics.find(x => x.id == i) as Topic });
    dto.task = this.updateLesson.value.task!;
    dto.description = this.updateLesson.value.description!;

    console.log(this.updateLesson.value.time!);
    console.log(moment(this.updateLesson.value.date!, "dd-MM-yyyy"));

    let time = moment(this.updateLesson.value.time!, "HH:mm");
    let date = moment(this.updateLesson.value.date!, "dd-MM-yyyy").set({ hour: time.get('hour'), minute: time.get('minute'), second: 0 }).format('YYYY-MM-ddTHH:mm:ss');

    console.log(time.get('hour'));
    console.log(time.get('minute'));

    console.log("time: " + time + " --date: " + date);
    dto.date = new DatePipe('en-US').transform(date, 'YYYY-MM-ddTHH:mm:ss');

    dto.isPaid = this.updateLesson.value.isPaid!;
    dto.price = this.updateLesson.value.price!;
    dto.dateOfPayment = this.updateLesson.value.dateOfPayment!;
    dto.lessonDuration = this.updateLesson.value.lessonDuration!;

    dto.isPrepared = this.updateLesson.value.isPrepared!;
    dto.isTaskGiven = this.updateLesson.value.isTaskGiven!;
    dto.isCompleted = this.updateLesson.value.isCompleted!;
    dto.isCanceled = this.updateLesson.value.isCanceled!;

    dto.gradeHome = this.updateLesson.value.gradeHome!;
    dto.gradeLesson = this.updateLesson.value.gradeLesson!;

    return dto;
  }
}
