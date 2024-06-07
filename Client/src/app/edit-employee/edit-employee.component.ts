import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';
import { Input } from '@angular/core';
import { Employees } from '../employees';
@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
  editEmployeeForm: employeeForm = new employeeForm();

  @ViewChild('employeeForm')
  employeeForm!: NgForm;

  isSubmitted: boolean = false;
  employeeId: any;

  public employeeList: Employees = {
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    phone: '',
  };
  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private httpProvider: HttpProviderService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      var id = Number(param.get('employeeId'));
      this.getById(id);
    });
  }

  getById(id: number) {
    this.httpProvider.getEmployeeDetailById(id).subscribe((data) => {
      console.log(data);
      this.employeeList = data as Employees;
    });
  }
  update(employee: any) {
    this.isSubmitted = true;
    if (employee) {
      console.log(this.employeeList);

      this.httpProvider.editEmployee(this.employeeList).subscribe({
        next: (data) => {
          console.log(data);

          this.toastr.success('Sửa Nhân Viên Thành Công');
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}

export class employeeForm {
  id: number = 0;
  first_name: string = '';
  last_name: string = '';
  email: string = '';
  address: string = '';
  phone: string = '';
}
