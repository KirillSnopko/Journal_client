import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { HttpSubjectProviderService } from 'src/app/http/provider/http-subject-provider.service';
import { SubjectDeleteComponent } from '../subject-delete/subject-delete.component';
import { SubjectAdd } from 'src/app/models/subject/subject-add';


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
  name: string = "";
  subjectAdd: SubjectAdd = new SubjectAdd();
  isSubmitted: boolean = false;
  @ViewChild("add")
  SubjectAdd!: NgForm;

  constructor(private router: Router, private subjectProvider: HttpSubjectProviderService, private delComp: SubjectDeleteComponent, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getSubjects();
  }

  AddSubject(form: NgForm) {
    this.isSubmitted = true;

    this.subjectProvider.add(this.subjectAdd).subscribe(async data => {
      if (data.status == 201) {
        this.toastr.success(data.body.name + " добавлен!");
        setTimeout(() => {
          this.getSubjects();
         form.
          form.reset(this.isSubmitted);
        
        }, 500);
      }
    },
      async error => {
        this.toastr.error(error.message);
        setTimeout(() => {
          this.router.navigate(['/subjects']);
        }, 500);
      });
  }

  async getSubjects() {
    this.subjectProvider.getList().subscribe((data: any) => {
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

  deleteSubjectConfirmation(subject: any) {
    this.delComp.deleteConfirmation(subject, this);
  }

  getProvider() {
    return this.subjectProvider;
  }
}