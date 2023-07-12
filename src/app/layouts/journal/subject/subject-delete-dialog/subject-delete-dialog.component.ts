import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

import { ApiRoutes } from 'src/app/http/api-routes';
import { HttpProviderService } from 'src/app/http/provider/http-provider.service';
import { UpdateSubject } from 'src/app/models/subject/update-subject';


@Component({
  selector: 'app-subject-delete-dialog',
  templateUrl: './subject-delete-dialog.component.html',
  styleUrls: ['./subject-delete-dialog.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, CommonModule, MatTooltipModule, MatInputModule, MatIconModule],
})

export class SubjectDeleteDialogComponent {

  constructor(
    public dialog: MatDialog,
    private provider: HttpProviderService,
    public dialogRef: MatDialogRef<SubjectDeleteDialogComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public subject: UpdateSubject,
  ) { }

  delete() {
    this.provider.setUrl(ApiRoutes.subject.toString())
      .delete(this.subject.id).subscribe((data: any) => {
        if (data.status == 204) {
          this.toastr.success("Удалено");
          setTimeout(() => {
            this.close();
          }, 500);
        } else {
          this.toastr.error(data.message);
        }
      },
        (error: any) => {
          this.toastr.error(error);
        });
  }

  close() {
    this.dialogRef.close();
  }
}
