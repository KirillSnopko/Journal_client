import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { HttpProviderService } from 'src/app/http/provider/http-provider.service';
import { ApiRoutes } from 'src/app/http/api-routes';
import { SubjectCreateDialogComponent } from '../subject-create-dialog/subject-create-dialog.component';
import { SubjectUpdateDialogComponent } from '../subject-update-dialog/subject-update-dialog.component';
import { UpdateSubject } from 'src/app/models/subject/update-subject';
import { DeleteDialogComponent } from 'src/app/layouts/common/delete-dialog/delete-dialog.component';


@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styles: [`
  input.ng-touched.ng-invalid {border:solid red 2px;}
  input.ng-touched.ng-valid {border:solid green 2px;}
`],
})
export class SubjectListComponent implements OnInit {
  subjects: any = [];

  constructor(
    private provider: HttpProviderService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getSubjects();
  }

  async getSubjects() {
    this.provider.setUrl(ApiRoutes.subject.toString())
      .getList().subscribe((data: any) => {
        if (data != null && data.body != null) {
          var resultData = data.body;
          if (resultData) {
            this.subjects = resultData;
          }
        }
      },
        (error: any) => {
          if (error) {
            if (error.status == 404) {
              if (error.error && error.error.message) {
                this.subjects = [];
              }
            }
          }
        });
  }

  createDialog() {
    const dialogRef = this.dialog.open(SubjectCreateDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.getSubjects();
    });
  }

  updateDialog(subject: UpdateSubject) {
    const dialogRef = this.dialog.open(SubjectUpdateDialogComponent, { data: subject });
    dialogRef.afterClosed().subscribe(result => {
      this.getSubjects();
    });
  }

  deleteDialog(subject: UpdateSubject) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, { data: { id: subject.id, name: subject.name, route: ApiRoutes.subject.toString() } });
    dialogRef.afterClosed().subscribe(result => {
      this.getSubjects();
    });
  }
}