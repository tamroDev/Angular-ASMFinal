import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  constructor(
    private router: Router,
    private httpProvider: HttpProviderService,
    private toastr: ToastrService
  ) {}
  addTaskForm: taskForm = new taskForm();
  taskForm!: NgForm;
  taskList: any = [];
  projectList: any = [];
  employeesList: any = [];

  ngOnInit(): void {
    this.taskList = this.httpProvider
      .getAllTask()
      .subscribe((data) => (this.taskList = data));
    this.projectList = this.httpProvider
      .getAllProject()
      .subscribe((data) => (this.projectList = data));
    this.employeesList = this.httpProvider
      .getAllEmployee()
      .subscribe((data) => (this.employeesList = data));
  }

  isSubmitted: boolean = false;

  addTask(task: any) {
    this.isSubmitted = true;
    // console.log(first_name, last_name, Address, Email, Phone);
    if (task) {
      this.httpProvider.addTask(this.addTaskForm).subscribe((data) => {
        if (data != null) {
          this.toastr.success('Thêm Công việc Thành Công');
          setTimeout(() => {
            this.router.navigate(['/Task']);
          }, 500);
        }
      });
    }
  }
}
export class taskForm {
  id: number = 0;
  name: string = '';
  project_id: number = 0;
  assigned_to: number = 0;
  description: string = '';
  status: string = '';
  priority: number = 0;
}
