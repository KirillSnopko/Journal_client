import { Component, OnInit, Type, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpSubjectProviderService } from 'src/app/http/provider/http-subject-provider.service';

@Component({
  selector: 'ng-modal-confirm',
  standalone: true,
  template: `
  <div class="modal-header">
    <h5 class="modal-title" id="modal-basic-title">Delete Confirmation</h5>
    <button type="button" class="close" aria-label="Close" (click)="modal.dismiss('Cancel')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p>Are you sure you want to delete?</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('Cancel')">CANCEL</button>
    <button type="button" ngbAutofocus class="btn btn-success" (click)="modal.close('Ok')">OK</button>
  </div>
  `,
})

export class NgModalConfirm {
  constructor(public modal: NgbActiveModal) { }
}

const MODALS: { [name: string]: Type<any> } = {
  deleteModal: NgModalConfirm,
};




@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {
  subjects: any = [];
  constructor(private router: Router, private subjectProvider: HttpSubjectProviderService, private modalService: NgbModal, private toastr: ToastrService) { }

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
    this.modalService.open(MODALS['deleteModal'],
      {
        ariaLabelledBy: 'modal-basic-title'
      }).result.then((result) => {
        this.deleteSubject(subject);
      },
        (reason) => { });
  }

  /*
    delete() {
      this.fruitService.delete(this.idTodelete).subscribe({
        next: (data) => {
          this.allFruits = this.allFruits.filter(_ => _.id != this.idTodelete)
          this.deleteModal.hide();
        },
      });
    }
  */



  deleteSubject(subject: any) {

    this.subjectProvider.delete(subject.id).subscribe((data: any) => {
      /* if (data != null && data.body != null) {
         var resultData = data.body;
         //if (resultData != null && resultData.isSuccess) {
           this.toastr.success(resultData.message);
           this.getSubjects();
         //}
       }*/
      this.toastr.success("Успешно");
      this.getSubjects();
    },
      (error: any) => { });
  }
}