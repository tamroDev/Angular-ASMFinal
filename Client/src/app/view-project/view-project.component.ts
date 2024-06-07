import { Component, Input, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ng-modal-confirm',
  template: `
    <div class="modal-header">
      <h5 class="modal-title" id="modal-title">Confirm Employee Deletion</h5>
      <button
        type="button"
        class="btn close"
        aria-label="Close button"
        aria-describedby="modal-title"
        (click)="modal.dismiss('Cross click')"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Are you sure you want to delete?</p>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-secondary"
        (click)="modal.dismiss('cancel click')"
      >
        EXIT
      </button>
      <button
        type="button"
        ngbAutofocus
        class="btn btn-success"
        (click)="modal.close('Ok click')"
      >
        DELETE
      </button>
    </div>
  `,
})
export class NgModalConfirm {
  constructor(public modal: NgbActiveModal) {}
}

const MODALS: { [name: string]: Type<any> } = {
  deleteModal: NgModalConfirm,
};

@Component({
  selector: 'app-home',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css'],
})
export class ViewProjectComponent implements OnInit {
  projectList: any = [];
  employeesList: any = [];
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private httpProvider: HttpProviderService,
    private HttpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.projectList = this.httpProvider
      .getAllProject()
      .subscribe((data) => (this.projectList = data));
    this.employeesList = this.httpProvider
      .getAllEmployee()
      .subscribe((data) => (this.employeesList = data));
  }
  getAllProject() {
    this.projectList = this.httpProvider
      .getAllProject()
      .subscribe((data) => (this.projectList = data));
  }

  addProject() {
    this.router.navigate(['AddProject']);
  }
  deleteProjectConfirmation(project: any) {
    this.modalService
      .open(MODALS['deleteModal'], {
        ariaLabelledBy: 'modal-basic-title',
      })
      .result.then(
        (result) => {
          this.deleteProject(project);
        },
        (reason) => {}
      );
    this.router.navigate(['Project']);
  }

  deleteProject(projectId: any) {
    this.httpProvider.deleteProject(projectId).subscribe((data) => {
      if (data != null) {
        this.toastr.success('Xóa Dự án Thành Công');
        this.getAllProject();
      }
    });
  }
}
