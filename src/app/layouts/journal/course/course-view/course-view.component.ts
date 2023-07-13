import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Course } from 'src/app/models/course/course';
import { HttpProviderService } from 'src/app/http/provider/http-provider.service';
import { ApiRoutes } from 'src/app/http/api-routes';
import { CourseUpdate } from 'src/app/models/course/course-update';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.css']
})
export class CourseViewComponent implements OnInit {
  id: any;
  course: Course = {} as Course;
  upForm: any;
  formats: string[] = ["online", "offline"];

  constructor(private route: ActivatedRoute,
    private provider: HttpProviderService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['courseid'];
    this.getCourse();
    this.upForm = this.fb.group({
      type: [this.course.type, [Validators.required]],
      dateOfStart: [this.course.dateOfStart],
      dateOfFinish: [this.course.dateOfFinish],
      price: [this.course.price],
      lessonDuration: [this.course.lessonDuration],
      description: [this.course.description],
      gradeLevel: [this.course.gradeLevel]
    })
  }

  getCourse() {
    this.provider.setUrl(ApiRoutes.course.toString())
      .get(this.id).subscribe((data: any) => {
        this.course = data.body;
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
    dto.dateOfStart = this.upForm.value.dateOfStart!;
    dto.dateOfFinish = this.upForm.value.dateOfFinish!;
    dto.price = this.upForm.value.price!;
    dto.lessonDuration = this.upForm.value.lessonDuration!;
    dto.description = this.upForm.value.description!;
    dto.gradeLevelId = this.upForm.value.gradeLevel!;

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
}
