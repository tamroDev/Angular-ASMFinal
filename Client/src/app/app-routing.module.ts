import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { HomeComponent } from './home/home.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { ViewProjectComponent } from './view-project/view-project.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { DetailProjectComponent } from './detail-project/detail-project.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RoleGuard } from './protect.guard';
import { ErrorComponent } from './error/error.component';

const commonRoutes: Routes = [
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'Signup', component: SignupComponent },
  { path: 'Error', component: ErrorComponent },
];

export function getRoutesBasedOnRole(): Routes {
  const role = localStorage.getItem('role_id');
  console.log(role);

  const employeeRoutes: Routes = [
    { path: 'AddTask', component: AddTaskComponent, canActivate: [RoleGuard] },
    {
      path: 'EditTask/:taskId',
      component: EditTaskComponent,
      canActivate: [RoleGuard],
    },
    { path: 'Task', component: ViewTaskComponent, canActivate: [RoleGuard] },
  ];

  const leaderRoutes: Routes = [
    { path: 'AddTask', component: AddTaskComponent, canActivate: [RoleGuard] },
    {
      path: 'EditTask/:taskId',
      component: EditTaskComponent,
      canActivate: [RoleGuard],
    },
    { path: 'Task', component: ViewTaskComponent, canActivate: [RoleGuard] },
    {
      path: 'Project',
      component: ViewProjectComponent,
      canActivate: [RoleGuard],
    },
    {
      path: 'ViewEmployee/:employeeId',
      component: ViewEmployeeComponent,
      canActivate: [RoleGuard],
    },
    {
      path: 'ViewProject/:projectId',
      component: DetailProjectComponent,
      canActivate: [RoleGuard],
    },
    {
      path: 'AddEmployee',
      component: AddEmployeeComponent,
      canActivate: [RoleGuard],
    },
    {
      path: 'AddProject',
      component: AddProjectComponent,
      canActivate: [RoleGuard],
    },
    {
      path: 'EditEmployee/:employeeId',
      component: EditEmployeeComponent,
      canActivate: [RoleGuard],
    },
    {
      path: 'EditProject/:projectId',
      component: EditProjectComponent,
      canActivate: [RoleGuard],
    },
    { path: '**', component: ErrorComponent },
  ];

  return [...commonRoutes, ...(role === '1' ? leaderRoutes : employeeRoutes)];
}

@NgModule({
  imports: [RouterModule.forRoot(getRoutesBasedOnRole())],
  exports: [RouterModule],
})
export class AppRoutingModule {}
