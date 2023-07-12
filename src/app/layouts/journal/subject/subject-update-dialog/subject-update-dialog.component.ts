import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ApiRoutes } from 'src/app/http/api-routes';
import { HttpProviderService } from 'src/app/http/provider/http-provider.service';
import { UpdateSubject } from 'src/app/models/subject/update-subject';
import { SubjectPreview } from 'src/app/models/subject/subject-preview';

@Component({
  selector: 'app-subject-update-dialog',
  templateUrl: './subject-update-dialog.component.html',
  styleUrls: ['./subject-update-dialog.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, CommonModule, MatTooltipModule, MatInputModule],
})

export class SubjectUpdateDialogComponent implements OnInit {
  updateSubject: any;

  constructor(public dialog: MatDialog,
    private provider: HttpProviderService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SubjectUpdateDialogComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: UpdateSubject,
  ) { }

  ngOnInit(): void {
    this.updateSubject = this.fb.group({
      name: [this.data.name, Validators.required],
    });
  }

  update() {
    var dto: SubjectPreview = new SubjectPreview();
    dto.Name = this.updateSubject.value.name!;
    this.provider.setUrl(ApiRoutes.subject.toString())
      .update(dto, this.data.id).subscribe(async data => {
        if (data.status == 200) {
          this.toastr.success("обновлено!");
          setTimeout(() => {
            this.close();
          }, 500);
        }
      },
        async error => {
          this.toastr.error(error.message);
        });
  }

  close() {
    this.updateSubject.reset();
    this.dialogRef.close();
  }
}
