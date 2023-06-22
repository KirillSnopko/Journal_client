import { Component, Type, Injectable, ViewChild, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { HttpSubjectProviderService } from 'src/app/http/provider/http-subject-provider.service';
import { SubjectPreview } from 'src/app/models/subject/subject-preview';

@Component({
  selector: 'app-subject-edit',
  templateUrl: './subject-edit.component.html',
  styleUrls: ['./subject-edit.component.css'],
})


export class SubjectEditComponent implements OnInit {
  subjectEdit: SubjectPreview = new SubjectPreview();
  subjectId: any;
  @ViewChild("editSubject")
  editSubject!: NgForm;

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router, private subjectProvider: HttpSubjectProviderService) { }

  ngOnInit(): void {
    this.subjectId = this.route.snapshot.params['subjectid'];
    this.getSubjectById();
  };

  getSubjectById() {
    this.subjectProvider.get(this.subjectId).subscribe((data: any) => {
      if (data.status == 200) {
        this.subjectEdit.Name = data.body.name;
      }
    },
      (error: any) => { });
  }

  Edit() {
    this.subjectProvider.update(this.subjectEdit, this.subjectId).subscribe(async data => {
      if (data.status == 200) {
        setTimeout(() => {
          this.router.navigate(['/subjects/']);
        }, 500);
        this.toastr.success("обновлено!");
      }
    },
      async error => {
        this.toastr.error(error.message);
      });
  }
}








