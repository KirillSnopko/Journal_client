import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ApiRoutes } from 'src/app/http/api-routes';
import { HttpProviderService } from 'src/app/http/provider/http-provider.service';
import { CourseCreate } from 'src/app/models/course/course-create';
import { ModelAdd } from 'src/app/models/common/model-add';

@Component({
  selector: 'app-course-create-dialog',
  templateUrl: './course-create-dialog.component.html',
  styleUrls: ['./course-create-dialog.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatStepperModule, MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, CommonModule],
})

export class CourseCreateDialogComponent {

  formats: string[] = ["online", "offline"];
  subjects: any;
  gradelevels: any;
  firstFormGroup = this.fb.group({
    format: ['', Validators.required],

  });
  secondFormGroup = this.fb.group({
    subject: ['', Validators.required],
  });
  thirdFormGroup = this.fb.group({
    gradelevel: ['', Validators.required],
  });

  constructor(public dialog: MatDialog,
    private provider: HttpProviderService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<CourseCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModelAdd,
    private toastr: ToastrService,
  ) { }

  getSubjects(stepper: any) {
    this.provider.setUrl(ApiRoutes.subject).getList().subscribe((data: any) => {
      if (data != null && data.body != null) {
        this.subjects = data.body;
        stepper.next();
      }
    },
      (error: any) => {
        if (error) {
          if (error.status == 404) {
            if (error.error && error.error.message) {
              this.subjects = [];
            }
          }
          this.toastr.error(error.error.message);
        }
      });
  }

  getGradeLevel(stepper: any) {
    var id = this.secondFormGroup.value.subject!;
    this.provider.setUrl(ApiRoutes.subject.toString() + id + ApiRoutes.grades.toString()).getList().subscribe((data: any) => {
      if (data != null && data.body != null) {
        this.gradelevels = data.body;
        stepper.next();
      }
    },
      (error: any) => {
        if (error) {
          if (error.status == 404) {
            if (error.error && error.error.message) {
              this.gradelevels = [];
            }
          }
          this.toastr.error(error.error.message);
        }
      });
  }

  createCourse(stepper: any) {
    var dto: CourseCreate = new CourseCreate();
    dto.studentProfileId = this.data.id;
    dto.gradelevelId = this.thirdFormGroup.value.gradelevel!;
    dto.type = this.firstFormGroup.value.format!;
    console.log(dto);
    this.provider.setUrl(ApiRoutes.course.toString())
      .add(dto)
      .subscribe(async data => {
        if (data.status == 201) {
          this.toastr.success("Добавлено!");
          setTimeout(() => {

            this.close(stepper);

          }, 500);
        }
      },
        async error => {
          this.toastr.error(error.error.errors.toString());
        });
  }

  close(stepper: any) {
    stepper.reset();
    this.dialogRef.close();
  }
}


