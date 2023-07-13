import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

import { ApiRoutes } from 'src/app/http/api-routes';
import { Gradelevel } from 'src/app/models/gradelevel/gradelevel';
import { GradelevelCreate } from 'src/app/models/gradelevel/gradelevel-create';
import { HttpProviderService } from 'src/app/http/provider/http-provider.service';
import { DeleteDialogComponent } from 'src/app/layouts/common/delete-dialog/delete-dialog.component';


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
    description: ['', [Validators.required]],
  });

  subjectId: any;

  constructor(
    private route: ActivatedRoute,
    private provider: HttpProviderService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.provider.setUrl(ApiRoutes.subject.toString());
    this.subjectId = this.route.snapshot.params['subjectid'];
    this.getGrade();
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

  selectGrade(gradelevel: Gradelevel) {
    if (Object.keys(this.gradeSelected).length === 0) {
      this.gradeSelected = gradelevel;
      this.gradeIsEditing = true

      this.formGrade.patchValue({
        description: gradelevel.description,
      })
    }
  }

  addGrade() {
    this.gradeList.unshift({
      id: 0,
      subjectid: this.subjectId,
      description: '',
      count: 0
    });

    this.gradeSelected = this.gradeList[0];
  }

  updateGrade() {
    var dto: GradelevelCreate = new GradelevelCreate();
    dto.Description = this.formGrade.value.description!;
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
        },
          async error => {
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
        },
          async error => {
            this.toastr.error(error.error.emessage);
          });
    }

    this.resetForm();
  }

  cancelGrade() {
    if (!this.gradeIsEditing && confirm('All unsaved changes will be removed. Are you sure you want to cancel?')) {
      this.gradeList.splice(0, 1);
    }

    this.resetForm();
  }

  deleteDialog(grade: Gradelevel) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, { data: { id: grade.id, name: grade.description, route: ApiRoutes.gradelevel.toString() } });
    dialogRef.afterClosed().subscribe(result => {
      this.getGrade();
      this.resetForm();
    });
  }

  private resetForm() {
    this.gradeSelected = {} as Gradelevel;
    this.gradeIsEditing = false
    this.formGrade.reset();
  }
}
