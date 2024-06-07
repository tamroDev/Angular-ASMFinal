import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employdee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeForm: EmployeeForm = new EmployeeForm();

  constructor(
    private router: Router,
    private httpProvider: HttpProviderService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    console.log(this.addEmployeeForm);
  }

  isSubmitted: boolean = false;

  addEmployee(form: NgForm): void {
    this.isSubmitted = true;
    if (form.valid) {
      this.httpProvider.addEmployee(this.addEmployeeForm).subscribe(
        (data) => {
          console.log(data);
          this.toastr.success('Thêm Nhân Viên Thành Công');
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        },
        (error) => {
          console.error(error);
          this.toastr.error('Đã xảy ra lỗi khi thêm nhân viên');
        }
      );
    }
  }
}

export class EmployeeForm {
  first_name: string = '';
  last_name: string = '';
  email: string = '';
  address: string = '';
  phone: string = '';
}
