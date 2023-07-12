import { Component } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ApiRoutes } from 'src/app/http/api-routes';
import { HttpProviderService } from 'src/app/http/provider/http-provider.service';
import { SubjectPreview } from 'src/app/models/subject/subject-preview';

@Component({
  selector: 'app-subject-create-dialog',
  templateUrl: './subject-create-dialog.component.html',
  styleUrls: ['./subject-create-dialog.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, CommonModule, MatTooltipModule, MatInputModule],
})
export class SubjectCreateDialogComponent {
  createSubject = this.fb.group({
    name: ['', Validators.required],
  });

  constructor(public dialog: MatDialog,
    private provider: HttpProviderService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<SubjectCreateDialogComponent>,
    private toastr: ToastrService,
  ) { }

  create() {
    var dto: SubjectPreview = new SubjectPreview();
    dto.Name = this.createSubject.value.name!;

    this.provider.setUrl(ApiRoutes.subject.toString())
      .add(dto)
      .subscribe(async data => {
        if (data.status == 201) {
          this.toastr.success("Добавлено!");
          setTimeout(() => {
            this.close();
          }, 500);
        }
      },
        async error => {
          this.toastr.error(error.error.errors.toString());
        });
  }

  close() {
    this.createSubject.reset();
    this.dialogRef.close();
  }
}

