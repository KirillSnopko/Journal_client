import { Component, OnInit, DoCheck, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Course } from 'src/app/models/course/course';
import { HttpProviderService } from 'src/app/http/provider/http-provider.service';
import { ApiRoutes } from 'src/app/http/api-routes';
import { CourseUpdate } from 'src/app/models/course/course-update';
import * as moment from 'moment';
import 'moment/locale/ru';
import * as Chartist from 'chartist';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core'
import { DatePipe } from '@angular/common';
import { Lesson } from 'src/app/models/lesson/lesson';
import { DeleteDialogComponent } from 'src/app/layouts/common/delete-dialog/delete-dialog.component';
import { LessonCreateDialogComponent } from '../../lesson/lesson-create-dialog/lesson-create-dialog.component';

//формат даты, локаль
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})

export class CourseViewComponent implements OnInit, AfterContentInit {
  id: any;
  course: Course = {} as Course;
  lessons: Lesson[] = [];
  homeGrade: Lesson[] = [];
  lessonGrade: Lesson[] = [];
  upForm = this.fb.group({
    type: [this.course.type, [Validators.required]],
    price: [0],
    lessonDuration: [0],
    description: [""],
    gradeLevel: []
  });
  formats: string[] = ["Online", "Offline"];

  constructor(
    private route: ActivatedRoute,
    private provider: HttpProviderService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private _adapter: DateAdapter<any>,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['courseid'];
    this.getCourse();
    this._adapter.setLocale("ru");
    //this.generateCourseStatHome();
  }

  ngAfterContentInit():void{
    this.generateCourseStatHome();
  }

  startAnimationForLineChart(chart: any) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data: any) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  };


  getCourse() {
    this.provider.setUrl(ApiRoutes.course.toString())
      .get(this.id).subscribe((data: any) => {
        this.course = data.body as Course;
        this.lessons = data.body.lessons as Lesson[];
        this.homeGrade = this.lessons.filter(i => i.gradeHome > 0);
        this.lessonGrade = this.lessons.filter(i => i.gradeLesson > 0);
       // this.generateCourseStatHome();
        //  this.generateCourseStatLesson();
      },
        (error: any) => {
          if (error) {
            if (error.status == 404) {
              if (error.error && error.error.message) {
                this.course = {} as Course;
              }
            }
          }
        });
  }

  update() {
    var dto: CourseUpdate = new CourseUpdate();
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
        });
  }

  addDialog() {
    const dialogRef = this.dialog.open(LessonCreateDialogComponent, { height: '650px', width: '600px', data: { id: this.course.id }, });
    dialogRef.afterClosed().subscribe(result => {
      this.getCourse();
    });
  }

  deleteDialog(lesson: Lesson) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, { data: { id: lesson.id, name: "занятие", route: ApiRoutes.lesson.toString() } });
    dialogRef.afterClosed().subscribe(result => {
      this.getCourse();
    });
  }

  unpaidCount() {
    return this.lessons.filter(less => less.isPaid && less.isCompleted).length;
  }

  completedCount() {
    return this.lessons.filter(less => less.isCompleted).length;
  }

  totalGrade() {
    const sumHome = this.homeGrade.reduce((sum, item) => {
      return sum + item.gradeHome;
    }, 0) / this.homeGrade.length;

    const sumLesson = this.lessonGrade.reduce((sum, item) => {
      return sum + item.gradeLesson;
    }, 0) / this.lessonGrade.length;

    return (sumHome + sumLesson) / 2;
  }

  generateCourseStatHome() {
    /* const homeStat: any = {
       labels: this.homeGrade.map(i => moment(i.date).format("MM.yy")),
       series: [
         this.homeGrade.map(i => i.gradeHome),
       ]
     };*/

    const homeStat: any = {
      labels: ["10.2023", "11.2023"],
      series: [
        [6, 7.5]
      ]
    };


    const optionsHomeStat: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50,
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    }

    var homeStatChart = new Chartist.LineChart('#homeGradeStat', homeStat, optionsHomeStat);

    this.startAnimationForLineChart(homeStatChart);
  }

  generateCourseStatLesson() {
    const lessonsStat: any = {
      labels: this.lessonGrade.map(i => moment(i.date).format("MM.yy")),
      series: [
        this.lessonGrade.map(i => i.gradeLesson),
      ]
    };

    const optionsLessonsStat: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50,
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    }

    var lessonStatChart = new Chartist.LineChart('#courseLessonStat', lessonsStat, optionsLessonsStat);

    this.startAnimationForLineChart(lessonStatChart);
  }
}
