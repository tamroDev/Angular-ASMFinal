import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpProviderService } from '../service/http-provider.service';
import { Project, ProjectTeam } from '../project';

@Component({
  selector: 'app-detail-project',
  templateUrl: './detail-project.component.html',
  styleUrls: ['./detail-project.component.scss']
})
export class DetailProjectComponent implements OnInit {
  public project: Response = {
    id: 0,
    name: '',
    date_created: '',
    budget: 0,
    leader: 0,
    team: '' 
  };
  public employeesList: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private httpProvider: HttpProviderService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      const id = Number(param.get('projectId'));
      this.getProjectMembers(id);
    });

    this.getAllEmployees();
  }

  getProjectMembers(id: number): void {
    this.httpProvider.getProjectMembers(id).subscribe((data: any) => {
      const responseData = data as Response[];
      if (responseData.length > 0) {
        this.project = responseData[0];
      }
    });
  }

  getAllEmployees(): void {
    this.httpProvider.getAllEmployee().subscribe((data) => {
      this.employeesList = data as any;
    });
  }
}
interface Response {
  id: number;
  name: string;
  date_created: string;
  budget: number;
  leader: number;
  team: string;
}