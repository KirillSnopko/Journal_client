import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpSubjectProviderService } from 'src/app/http/provider/http-subject-provider.service';
import { SubjectDeleteComponent } from '../subject-delete/subject-delete.component';


@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {
  subjects: any = [];
  constructor(private router: Router, private subjectProvider: HttpSubjectProviderService, private delComp: SubjectDeleteComponent) { }

  ngOnInit(): void {
    this.getSubjects();
  }

  AddSubject() {
    this.router.navigate(['subjects/add']);
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

  getProvider(){
    return this.subjectProvider;
  }
}