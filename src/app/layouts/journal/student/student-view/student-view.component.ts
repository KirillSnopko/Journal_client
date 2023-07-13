import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';


import { ApiRoutes } from 'src/app/http/api-routes';
import { HttpProviderService } from 'src/app/http/provider/http-provider.service';
import { Profile } from 'src/app/models/student/profile';
import { ProfileUpdate } from 'src/app/models/student/profile-update';
import { CourseCreateDialogComponent } from '../../course/course-create-dialog/course-create-dialog.component';
import { DeleteDialogComponent } from 'src/app/layouts/common/delete-dialog/delete-dialog.component';


@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css'],
})

export class StudentViewComponent implements OnInit {
  studentId: any;
  profile: Profile = new Profile();
  upForm: any;

  constructor(private route: ActivatedRoute,
    private provider: HttpProviderService,
    private toastr: ToastrService,
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

  openDialog() {
    const dialogRef = this.dialog.open(CourseCreateDialogComponent, { data: { id: this.profile.id }, });
    dialogRef.afterClosed().subscribe(result => {
      this.getProfile();
    });
  }

  deleteDialog(course: any) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, { data: { id: course.id, name: course.title + " (c занятиями)", route: ApiRoutes.course.toString() } });
    dialogRef.afterClosed().subscribe(result => {
      this.getProfile();
    });
  }
}
