import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';
import { HttpClient } from '@angular/common/http';

const apiUrl = 'http://localhost:3001/api';



@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {

  constructor(private HttpClient: HttpClient) { }
  // Get All Task, Service and Employee
  getAllEmployee() {
    return this.HttpClient.get(apiUrl + '/employees');
  }
  
  getAllProject() {
    return this.HttpClient.get(apiUrl + '/projects');
  }

  getAllProjectTeam() {
    return this.HttpClient.get(apiUrl + '/projects/project_team');
  }
  getAllTask() {
    return this.HttpClient.get(apiUrl + '/tasks');
  }

  // Add Employee, Service, Task
  addEmployee(employee: any) {
    return this.HttpClient.post(apiUrl + '/employees', employee);
  }

  addProject(projects: any) {
    return this.HttpClient.post(apiUrl + '/projects/', projects);
  }

  addTask(task: any) {
    return this.HttpClient.post(apiUrl + '/tasks/', task);
  }

  // Delete Employee, Service, Task
  deleteEmployee(employeeId: any) {
    return this.HttpClient.delete(apiUrl + '/employees/' + employeeId);
  }
  deleteProject(projectsId: any) {
    return this.HttpClient.delete(apiUrl + '/projects/' + projectsId);
  }
  deleteTask(taskId: any) {
    return this.HttpClient.delete(apiUrl + '/tasks/' + taskId);
  }

  // Edit Employee, Service, Task

  editEmployee(employeeId: any) {
    return this.HttpClient.put(apiUrl + '/employees/' + employeeId.id, employeeId);
  }

  editProject(projectsId: any) {
    return this.HttpClient.put(apiUrl + '/projects/' + projectsId.id, projectsId);
  }

  editTask(taskId: any) {
  return this.HttpClient.put(apiUrl + '/tasks/' + taskId.id, taskId);
  }


  //  Get one Employee, Service, Task
  getEmployeeDetailById(employeeId: any) {
    return this.HttpClient.get(apiUrl + '/employees/' + employeeId);
  }

  getProjectDetailById(projectsId: any) {
    return this.HttpClient.get(apiUrl + '/projects/proj/' + projectsId);
  }

  getTaskDetailById(taskId: any) {
    return this.HttpClient.get(apiUrl + '/tasks/' + taskId);
  }
  getProjectMembers(projectsId: number) {
    return this.HttpClient.get(apiUrl + '/projects/' + projectsId);
  }


  // constructor(private webApiService: WebApiService) { }

  // public getAllEmployee(): Observable<any> {
  //   return this.webApiService.get(apiUrl);
  // }

  // public deleteEmployeeById(employeeId: number): Observable<any> {
  //   const deleteUrl = `${apiUrl}/${employeeId}`;

  //   return this.webApiService.delete(apiUrl, employeeId);
  // }

  // public getEmployeeDetailById(model: any): Observable<any> {
  //   return this.webApiService.get(apiUrl + '?employeeId=' + model);
  // }

  // public saveEmployee(model: any): Observable<any> {
  //   return this.webApiService.post(apiUrl, model);
  // }



}
