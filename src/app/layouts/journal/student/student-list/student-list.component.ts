import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { ApiRoutes } from 'src/app/http/api-routes';
import { HttpProviderService } from 'src/app/http/provider/http-provider.service';
import { Student } from 'src/app/models/student/student';
import { StudentCreate } from 'src/app/models/student/student-create';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/layouts/common/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  selected: Student = {} as Student;
  isEditing: boolean = false;
  updateForm = this.fb.group({
    name: ["", [Validators.required]],
    age: [0, [Validators.required]],
  });

  constructor(
    private provider: HttpProviderService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() {
    this.provider.setUrl(ApiRoutes.student.toString())
      .getList().subscribe((data: any) => {
        this.students = data.body;
      },
        (error: any) => {
          if (error) {
            if (error.status == 404) {
              if (error.error && error.error.message) {
                this.students = [];
              }
            }
          }
        });
  }

  update() {
    var dto: StudentCreate = new StudentCreate();
    dto.name = this.updateForm.value.name!;
    dto.age = this.updateForm.value.age!;
    //add
    if (!this.isEditing) {
      this.provider.setUrl(ApiRoutes.student.toString())
        .add(dto)
        .subscribe(async data => {
          if (data.status == 201) {
            this.resetForm();
            this.toastr.success("Добавлено!");
            setTimeout(() => {
              this.getStudents();
            }, 500);
          }
        },
          async error => {
            this.toastr.error(error.error.errors.toString());
          });
    }
    //update 
    else {
      this.provider.setUrl(ApiRoutes.student.toString())
        .update(dto, this.selected.id)
        .subscribe(async data => {
          if (data.status == 200) {
            this.resetForm();
            this.toastr.success("обновлено!");
            setTimeout(() => {
              this.getStudents();
            }, 500);
          }
          console.log(data);
        },
          async error => {
            console.log(error);
            this.toastr.error(error.error.emessage);
          });
    }
  }

  add() {
    if (Object.keys(this.selected).length === 0) {
      this.students.unshift({
        id: 0,
        profileId: 0,
        name: "",
        age: 0
      });

      this.selected = this.students[0];
    } else {
      this.toastr.warning("Незавершенное действие");
    }
  }

  select(student: Student) {
    if (Object.keys(this.selected).length === 0) {
      this.selected = student;
      this.isEditing = true;

      this.updateForm.patchValue({
        name: student.name,
        age: student.age,
      })
    } else {
      this.toastr.warning("Незавершенное действие");
    }
  }

  deleteDialog(student: Student) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, { data: { id: student.id, name: student.name + " (c курсами и занятиями)", route: ApiRoutes.student.toString() } });
    dialogRef.afterClosed().subscribe(result => {
      this.getStudents();
      this.resetForm();
    });
  }

  cancel() {
    this.students.splice(0, 1);
    this.resetForm();
  }

  private resetForm() {
    this.selected = {} as Student;
    this.isEditing = false;
    this.updateForm.reset();
  }
}
