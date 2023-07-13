import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

import { HttpProviderService } from 'src/app/http/provider/http-provider.service';
import { ModelDelete } from 'src/app/models/common/model-delete';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, CommonModule, MatTooltipModule, MatInputModule, MatIconModule],
})
export class DeleteDialogComponent {
  constructor(
    public dialog: MatDialog,
    private provider: HttpProviderService,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public model: ModelDelete,
  ) { }

  delete() {
    this.provider.setUrl(this.model.route)
      .delete(this.model.id).subscribe((data: any) => {
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
