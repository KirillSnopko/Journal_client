import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { ApiRoutes } from 'src/app/http/api-routes';
import { HttpProviderService } from 'src/app/http/provider/http-provider.service';
import { Student } from 'src/app/models/student/student';
import { StudentCreate } from 'src/app/models/student/student-create';

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
  createForm = this.fb.group({
    name: ["", [Validators.required]],
    age: [0, [Validators.required]],
  });

  constructor(private route: ActivatedRoute, private provider: HttpProviderService, private toastr: ToastrService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getStudents();
  }

  async getStudents() {
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
            setTimeout(() => {
              this.getStudents();
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

    this.selected = {} as Student;
    this.isEditing = false;
    this.updateForm.reset();
  }

  add() {
    this.students.unshift({
      id: 0,
      profileId:0,
      name: "",
      age: 0
    });

    this.selected = this.students[0];
  }

  select(student: Student) {
    if (Object.keys(this.selected).length === 0) {
      this.selected = student;
      this.isEditing = true;

      this.updateForm.patchValue({
        name: student.name,
        age: student.age,
      })
    }
  }

  delete(id: number) {
    if (confirm('Вы уверены, что хотети удалить ученика? Так же будут удалены уроки и вся информация касаемая его!')) {

      this.provider.setUrl(ApiRoutes.student.toString())
        .delete(id).subscribe(async data => {
          if (data.status == 204) {
            this.toastr.success("Удалено!");
            setTimeout(() => {
              this.getStudents();
            }, 500);
          }
        },
          async error => {
            this.toastr.error(error.error.message);
          });
    }

    this.selected = {} as Student;
    this.isEditing = false;
    this.updateForm.reset();
  }

  cancel() {
    if (!this.isEditing && confirm('Все несохраненные изменения будут утеряны! Отменить?')) {
      this.students.splice(0, 1);
    }

    this.selected = {} as Student;
    this.isEditing = false;
    this.updateForm.reset();
  }
}
