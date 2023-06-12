import { Component, OnInit, Type } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpSubjectProviderService } from 'src/app/http/provider/http-subject-provider.service';


@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit{
  subjects: any = [];
  constructor(private router: Router, private subjectProvider: HttpSubjectProviderService, private modalService: NgbModal,  private toastr: ToastrService) { }

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

  deleteCarConfirmation(car: any) {
    this.modalService.open(MODALS['deleteModal'],
      {
        ariaLabelledBy: 'modal-basic-title'
      }).result.then((result) => {
        this.deleteSubject(car);
      },
        (reason) => {});
  }

  deleteSubject(subject: any) {
    this.subjectProvider.delete(subject.id).subscribe((data : any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData != null && resultData.isSuccess) {
          this.toastr.success(resultData.message);
          this.getSubjects();
        }
      }
    },
    (error : any) => {});
  }
}


@Component({
  selector:'ng-modal-confirm',
  template:`
  <div class="modal-header">
    <h5 class="modal-title" id="modal-title">Delete Confirmation</h5>
    <button type="button" class="btn close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p>Are you sure you want to delete?</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">CANCEL</button>
    <button type="button" ngbAutofocus class="btn btn-success" (click)="modal.close('Ok click')">OK</button>
  </div>
  `,
})

export class NgModalConfirm {
  constructor(public modal: NgbActiveModal) { }
}

const MODALS: { [name: string]: Type<any> } = {
  deleteModal: NgModalConfirm,
};
