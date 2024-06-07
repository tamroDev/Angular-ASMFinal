import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpProviderService } from '../service/http-provider.service';
import { WebApiService } from '../service/web-api.service';
import { Employees } from '../employees';
@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent implements OnInit {

  employeeId: any;
  employeeDetail : any= [];
  public employeeList: Employees = {
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    phone: '',
  };
  constructor(public webApiService: WebApiService, private route: ActivatedRoute, private httpProvider : HttpProviderService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      var id = Number(param.get('employeeId'));
      this.getById(id);
    });
  }

  getById(id: number) {
    this.httpProvider.getEmployeeDetailById(id).subscribe((data) => {
      console.log(data);
      this.employeeList = data as any;
      console.log(this.employeeList);
      
    });
  }

}
