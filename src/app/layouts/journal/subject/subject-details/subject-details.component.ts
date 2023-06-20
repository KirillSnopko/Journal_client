import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { HttpSubjectProviderService } from 'src/app/http/provider/http-subject-provider.service';
import { SubjectPreview } from 'src/app/models/subject/subject-preview';

@Component({
  selector: 'app-subject-details',
  templateUrl: './subject-details.component.html',
  styleUrls: ['./subject-details.component.css']
})
export class SubjectDetailsComponent implements OnInit {
  subjectId: any;
  subjectEdit: SubjectPreview = new SubjectPreview();
  @ViewChild("edit")
  SubjectAdd!: NgForm;

  constructor(private route: ActivatedRoute, private subjectProvider: HttpSubjectProviderService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.subjectId = this.route.snapshot.params['subjectid'];
  }

  EditSubject(form: NgForm) {
   
    this.subjectProvider.update(this.subjectEdit, this.subjectId).subscribe(async data => {
      if (data.status == 200) {
        this.toastr.success(data.body.name + "обновлено!");
        setTimeout(() => {
          //this.getSubjects();
        
          form.reset();
        
        }, 500);
      }
    },
      async error => {
        this.toastr.error(error.message);
        setTimeout(() => {
          this.router.navigate(['/subjects/details' + this.subjectId]);
        }, 500);
      });
  }
}
