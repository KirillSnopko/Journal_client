import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { ApiRoutes } from 'src/app/http/api-routes';
import { HttpProviderService } from 'src/app/http/provider/http-provider.service';
import { Profile } from 'src/app/models/student/profile';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css'],
})
export class StudentViewComponent {
  studentId: any;
  profile: Profile = new Profile();
  upForm: any;

  constructor(private route: ActivatedRoute, private provider: HttpProviderService, private toastr: ToastrService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.studentId = this.route.snapshot.params['studentid'];
    this.getProfile();
    this.upForm = this.fb.group({
      level: [1, [Validators.required]],
      description: [''],
      studentMobile: [''],
      parentName: [''],
      parentMobile: ['']
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
            }
          }
        });
  }

  updateProfile() {

  }
}
