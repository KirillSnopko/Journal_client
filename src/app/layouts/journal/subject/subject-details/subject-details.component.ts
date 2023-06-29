import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { ApiRoutes } from 'src/app/http/api-routes';
import { Gradelevel } from 'src/app/models/gradelevel/gradelevel';
import { GradelevelCreate } from 'src/app/models/gradelevel/gradelevel-create';
import { HttpProviderService } from 'src/app/http/provider/http-provider.service';
import { data } from 'jquery';

@Component({
  selector: 'app-subject-details',
  templateUrl: './subject-details.component.html',
  styleUrls: ['./subject-details.component.css']
})
export class SubjectDetailsComponent implements OnInit {

  gradeList: Gradelevel[] = [];
  gradeSelected: Gradelevel = {} as Gradelevel;
  gradeIsEditing: boolean = false;
  formGrade = this.fb.group({
    level: [1, [Validators.required]],
    description: ['', [Validators.required]],
  });

  subjectId: any;

  constructor(private route: ActivatedRoute, private provider: HttpProviderService, private toastr: ToastrService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.provider.setUrl(ApiRoutes.subject.toString());
    this.subjectId = this.route.snapshot.params['subjectid'];
    this.getGrade();
  }


  selectGrade(gradelevel: Gradelevel) {
    if (Object.keys(this.gradeSelected).length === 0) {
      this.gradeSelected = gradelevel;
      this.gradeIsEditing = true

      this.formGrade.patchValue({
        level: gradelevel.level,
        description: gradelevel.description,
      })
    }
  }

  deleteGrade(index: number) {
    if (confirm('Вы уверены, что хотети удалить программу с темами?')) {

      this.provider.setUrl(ApiRoutes.gradelevel.toString())
        .delete(index).subscribe(async data => {
          if (data.status == 204) {
            this.toastr.success("Удалено!");
            setTimeout(() => {
              this.getGrade();
            }, 500);
          }
          console.log(data);
        },
          async error => {
            console.log(error);
            this.toastr.error(error.error.message);
          });
    }

    this.gradeSelected = {} as Gradelevel;
    this.gradeIsEditing = false
    this.formGrade.reset();
  }

  updateGrade() {
    var dto: GradelevelCreate = new GradelevelCreate();
    dto.Description = this.formGrade.value.description!;
    dto.Level = this.formGrade.value.level!;
    dto.SubjectId = this.subjectId;
  
    if (!this.gradeIsEditing) {
      this.provider.setUrl(ApiRoutes.gradelevel.toString())
        .add(dto)
        .subscribe(async data => {
          if (data.status == 201) {
            this.toastr.success("Добавлено!");
            setTimeout(() => {

              this.getGrade();

            }, 500);
          }
          console.log(data);
        },
          async error => {
            console.log(error);
            this.toastr.error(error.error.errors.toString());
          });

    }
    else {
      this.provider.setUrl(ApiRoutes.gradelevel.toString())
        .update(dto, this.gradeSelected.id)
        .subscribe(async data => {
          if (data.status == 200) {
            setTimeout(() => {
              this.getGrade();
            }, 500);
            this.toastr.success("обновлено!");
          }
          console.log(data);
        },
          async error => {
            console.log(error);
            this.toastr.error(error.error.emessage);
          });
    }

    this.gradeSelected = {} as Gradelevel;
    this.gradeIsEditing = false
    this.formGrade.reset();
  }

  cancelGrade() {
    if (!this.gradeIsEditing && confirm('All unsaved changes will be removed. Are you sure you want to cancel?')) {
      this.gradeList.splice(0, 1);
    }

    this.gradeSelected = {} as Gradelevel;
    this.gradeIsEditing = false
    this.formGrade.reset();
  }

  addGrade() {
    this.gradeList.unshift({
      id: 0,
      subjectid: this.subjectId,
      level: 0,
      description: '',
      count: 0
    });

    this.gradeSelected = this.gradeList[0];
  }

  isEmpty(obj: any) {
    return Object.keys(obj).length === 0;
  }

  async getGrade() {
    this.provider.setUrl(ApiRoutes.subject.toString() + this.subjectId + ApiRoutes.grades.toString())
      .getList().subscribe((data: any) => {
        this.gradeList = data.body;
      },
        (error: any) => {
          if (error) {
            if (error.status == 404) {
              if (error.error && error.error.message) {
                this.gradeList = [];
              }
            }
          }
        });
  }
}
