import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
})
export class AddProjectComponent implements OnInit {
  addProjectForm: projectForm = new projectForm();

  projectForm!: NgForm;

  constructor(
    private router: Router,
    private httpProvider: HttpProviderService,
    private toastr: ToastrService
  ) {}

  employeesList: any = [];
  ngOnInit(): void {
    this.employeesList = this.httpProvider
      .getAllEmployee()
      .subscribe((data) => (this.employeesList = data));
  }
  isSubmitted: boolean = false;
  addProject(project: any) {
    this.isSubmitted = true;
    if (project) {
      const submitFormData = {
        name: this.addProjectForm.name,
        date_created: this.addProjectForm.date_created,
        budget: this.addProjectForm.budget,
        leader_id: this.addProjectForm.leader_id,
        team: this.addProjectForm.team,
      };

      this.httpProvider.addProject(submitFormData).subscribe((data) => {
        if (data != null) {
          this.toastr.success('Thêm Dự Án Thành Công');
          setTimeout(() => {
            this.router.navigate(['/Project']);
          }, 500);
        }
      });
    }
  }

  selectedTeams!: number[];

  onTeamSelectionChange() {
    this.selectedTeams = this.addProjectForm.team.map(Number);
    console.log(this.selectedTeams);
  }
}
export class projectForm {
  name: string = '';
  date_created: string = '';
  budget: number = 0;
  leader_id: number = 0;
  team: number[] = [];
}
