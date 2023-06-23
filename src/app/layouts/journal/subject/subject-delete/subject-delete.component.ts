import { Component, Type, Injectable } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SubjectListComponent } from '../subject-list/subject-list.component';

@Component({
  selector: 'app-subject-delete',
  standalone: true,
  template: `
  <div class="modal-header">
    <h5 class="modal-title" id="modal-basic-title">Удаление предмета</h5>
    <button type="button" class="close" aria-label="Close" (click)="modal.dismiss('Cancel')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p>Вы точно хотите удалить предмет?</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('Cancel')">Отмена</button>
    <button type="button" ngbAutofocus class="btn btn-warning" (click)="modal.close('Ok')">OK</button>
  </div>
  `,
})

export class NgModalConfirm {
  constructor(public modal: NgbActiveModal) { }
}

const MODALS: { [name: string]: Type<any> } = {
  deleteModal: NgModalConfirm,
};

@Injectable({ providedIn: 'root' })
export class SubjectDeleteComponent {
  constructor(private modalService: NgbModal, private toastr: ToastrService) { }

  deleteConfirmation(entity: any, listComponent: SubjectListComponent) {
    this.modalService.open(MODALS['deleteModal'],
      {
        ariaLabelledBy: 'modal-basic-title'
      }).result.then((result) => {

        listComponent.getProvider().delete(entity.id).subscribe((data: any) => {
          if (data.status == 204) {
            listComponent.getSubjects();
            this.toastr.success("Успешно");
          } else {
            this.toastr.error(data.message);
          }

        },
          (error: any) => { console.log(error) });
      },
        (reason) => { });
  }
}
