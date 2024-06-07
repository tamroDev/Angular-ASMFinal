import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';
import { ApiResponse, Project, ProjectTeam } from '../project';
@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css'],
})
export class EditProjectComponent implements OnInit {
  addProjectForm: projectForm = new projectForm();

  projectForm!: NgForm;
  isSubmitted: boolean = false;
  projectId: any;

  public projectList: Project = {
    id: 0,
    name: '',
    date_created: '',
    budget: 0,
    leader_id: 0,
  };

  public project: ProjectTeam = {
    id: 0,
    name: '',
    date_created: '',
    budget: 0,
    leader_id: 0,
    team: [],
  };
  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private httpProvider: HttpProviderService
  ) {}
  employeesList: any = [];
  selectedTeams: number[] = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      var id = Number(param.get('projectId'));
      this.getProjectMembers(id);
    });

    this.employeesList = this.httpProvider
      .getAllEmployee()
      .subscribe((data) => (this.employeesList = data));
  }

  getProjectMembers(id: number) {
    this.httpProvider.getProjectMembers(id).subscribe((data: any) => {
      const responseData = data as any[];
      console.log(responseData);
      if (responseData.length > 0) {
        this.project = responseData[0];
      }
    });
  }
  onTeamSelectionChange() {
    this.selectedTeams = this.addProjectForm.team.map(Number);
    console.log(this.selectedTeams);
  }
  update(project: any) {
    this.isSubmitted = true;
    this.project.team = this.selectedTeams;
    if (project) {
      this.httpProvider.editProject(this.project).subscribe({
        next: (data) => {
          this.toastr.success('Sửa Dự án Thành Công');
          setTimeout(() => {
            this.router.navigate(['/Project']);
          }, 500);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
export class projectForm {
  name!: string;
  date_created!: string;
  budget!: number;
  leader_id!: number;
  team: number[] = [];
}

export class projectTeam {
  id!: number;
  name!: string;
  date_created!: string;
  budget!: string;
  leader!: number;
  team: number[] = [];
}
