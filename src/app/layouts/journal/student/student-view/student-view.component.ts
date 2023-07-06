import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


import { ApiRoutes } from 'src/app/http/api-routes';
import { HttpProviderService } from 'src/app/http/provider/http-provider.service';
import { Profile } from 'src/app/models/student/profile';
import { ProfileUpdate } from 'src/app/models/student/profile-update';
import { CourseCreate } from 'src/app/models/course/course-create';


@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css'],
})

export class StudentViewComponent {
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



  constructor(private route: ActivatedRoute, private provider: HttpProviderService, private toastr: ToastrService, private router: Router, private fb: FormBuilder) { }

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

  createCourse() {
    var dto:CourseCreate = new CourseCreate();
    dto.profileId = this.profile.id;
    dto.subjectId = this.secondFormGroup.value.subject!;
    dto.gradelevelid = this.thirdFormGroup.value.gradelevel!;
    dto.type = this.firstFormGroup.value.format!;

    this.provider.setUrl(ApiRoutes.student.toString())
    .add(dto)
    .subscribe(async data => {
      if (data.status == 201) {
        this.toastr.success("Добавлено!");
        setTimeout(() => {

          this.getProfile();

        }, 500);
      }
    },
      async error => {
        this.toastr.error(error.error.errors.toString());
      });
   }
}
