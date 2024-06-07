import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';
import { Task } from '../task';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
})
export class EditTaskComponent implements OnInit {
  editTaskForm: taskForm = new taskForm();
  isSubmitted: boolean = false;
  taskId: any;
  projectList: any = [];
  employeesList: any = [];
  taskList: Task = {
    id: 0,
    name: '',
    project_id: 0,
    assigned_to: 0,
    description: '',
    status: '',
    priority: 0,
  };

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private httpProvider: HttpProviderService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      var id = Number(param.get('taskId'));
      this.getById(id);
    });

    this.httpProvider
      .getAllProject()
      .subscribe((data) => (this.projectList = data));

    this.httpProvider
      .getAllEmployee()
      .subscribe((data) => (this.employeesList = data));
  }

  getById(id: number) {
    this.httpProvider.getTaskDetailById(id).subscribe((data) => {
      console.log(data);
      this.taskList = data as Task;
    });
  }

  update(valid: boolean) {
    this.isSubmitted = true;
    if (valid) {
      this.httpProvider.editTask(this.taskList).subscribe({
        next: (data) => {
          this.toastr.success('Cập nhật công việc thành công');
          setTimeout(() => {
            this.router.navigate(['/Task']);
          }, 500);
        },
        error: (err) => {
          console.log(err);
        },
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
