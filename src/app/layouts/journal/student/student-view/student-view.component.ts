import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';


import { ApiRoutes } from 'src/app/http/api-routes';
import { HttpProviderService } from 'src/app/http/provider/http-provider.service';
import { Profile } from 'src/app/models/student/profile';
import { ProfileUpdate } from 'src/app/models/student/profile-update';
import { CourseCreate } from 'src/app/models/course/course-create';
import { CourseCreateDialogComponent } from '../../course/course-create-dialog/course-create-dialog.component';


@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css'],
})

export class StudentViewComponent implements OnInit {
  studentId: any;
  profile: Profile = new Profile();
  upForm: any;


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



  constructor(private route: ActivatedRoute,
    private provider: HttpProviderService,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.studentId = this.route.snapshot.params['studentid'];
    this.getProfile();
    this.upForm = this.fb.group({
      level: [this.profile.level, [Validators.required]],
      description: [this.profile.description],
      studentMobile: [this.profile.studentMobile],
      parentName: [this.profile.parentName],
      parentMobile: [this.profile.parentMobile]
    })

    
  }

  getProfile() {
    this.provider.setUrl(ApiRoutes.profile.toString())
      .get(this.studentId).subscribe((data: any) => {
        this.profile = data.body;
      },
        (error: any) => {
          if (error) {
            if (error.status == 404) {
              if (error.error && error.error.message) {
                this.profile = new Profile();
              }
              this.toastr.error(error.error.message);
            }
          }
        });
  }

  updateProfile(form: any) {
    var dto: ProfileUpdate = new ProfileUpdate();
    dto.level = this.upForm.value.level!;
    dto.studentMobile = this.upForm.value.studentMobile!;
    dto.description = this.upForm.value.description!;
    dto.parentName = this.upForm.value.parentName!;
    dto.parentMobile = this.upForm.value.parentMobile!;

    this.provider.setUrl(ApiRoutes.profile.toString())
      .update(dto, this.profile.id)
      .subscribe(async data => {
        if (data.status == 200) {
          setTimeout(() => {
            this.getProfile();
          }, 500);
          this.toastr.success("Обновлено!");
        }
      },
        async error => {
          this.toastr.error(error.error.message);
        });
  }


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
    dto.studentProfileId = this.profile.id;
    dto.gradelevelId = this.thirdFormGroup.value.gradelevel!;
    dto.type = this.firstFormGroup.value.format!;

    this.provider.setUrl(ApiRoutes.course.toString())
      .add(dto)
      .subscribe(async data => {
        if (data.status == 201) {
          this.toastr.success("Добавлено!");
          setTimeout(() => {

            stepper.reset();
            this.getProfile();

          }, 500);
        }
      },
        async error => {
          this.toastr.error(error.error.errors.toString());
        });
  }

  openDialog() {
    const dialogRef = this.dialog.open(CourseCreateDialogComponent, { data: { id: this.profile.id }, });
    dialogRef.afterClosed().subscribe(result => {
      this.getProfile();
    });
  }
}
