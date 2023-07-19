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

import { ApiRoutes } from 'src/app/http/api-routes';
import { HttpProviderService } from 'src/app/http/provider/http-provider.service';
import { ModelAdd } from 'src/app/models/common/model-add';
import { Course } from 'src/app/models/course/course';
import { Topic } from 'src/app/models/topic/topic';
import 'moment/locale/ru';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core'
import { DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

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
  selector: 'app-lesson-create-dialog',
  templateUrl: './lesson-create-dialog.component.html',
  styleUrls: ['./lesson-create-dialog.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatFormFieldModule, MatSelectModule, FormsModule,
    ReactiveFormsModule, CommonModule, MatTooltipModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})

export class LessonCreateDialogComponent implements OnInit {
  picker: any;
  course: Course = {} as Course;
  topics: Topic[] = [];
  createLesson = this.fb.group({
    topics: [Validators.required],
    task: [""],
    description: [""],
    date: [Validators.required],
    price: [],
    lessonDuration: [],
    isPrepared: [false],
    isTaskGiven: [false]
  });

  constructor(public dialog: MatDialog,
    private provider: HttpProviderService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<LessonCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModelAdd,
    private toastr: ToastrService,
    private _adapter: DateAdapter<any>,
  ) { }

  ngOnInit(): void {
    this.getCourse();
  }

  create() {
    /*   var dto: SubjectPreview = new SubjectPreview();
       dto.Name = this.createSubject.value.name!;
   
       this.provider.setUrl(ApiRoutes.subject.toString())
         .add(dto)
         .subscribe(async data => {
           if (data.status == 201) {
             this.toastr.success("Добавлено!");
             setTimeout(() => {
               this.close();
             }, 500);
           }
         },
           async error => {
             this.toastr.error(error.error.errors.toString());
           });*/
  }

  close() {
    this.createLesson.reset();
    this.dialogRef.close();
  }

  getCourse() {
    this.provider.setUrl(ApiRoutes.course.toString())
      .get(this.data.id).subscribe((data: any) => {
        this.course = data.body as Course;
        this.getTopics(data.body.gradeLevel.id);
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

  private getTopics(gradeId: any) {
    this.provider.setUrl(ApiRoutes.gradelevel.toString() + gradeId + ApiRoutes.topics.toString())
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

