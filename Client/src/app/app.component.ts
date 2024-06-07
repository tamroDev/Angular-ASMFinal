import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private auth: AuthService, private router: Router) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        // Kiểm tra nếu route hiện tại là '/Signup' hoặc '/Login', đặt shouldShowHeader thành false
        this.shouldShowHeader = !['/Signup', '/Login'].includes(event.url);
      }
    });
  }

  check() {
    let id_role = localStorage.getItem('role_id');
    let check_role = true;

    check_role = id_role === '1' ? true : false;

    return check_role;
  }

  shouldShowHeader = true;

  HomeClick() {
    this.router.navigate(['Home']);
  }

  EditEmployee() {
    // Lấy user id từ localStorage và chuyển hướng đến trang chỉnh sửa thông tin nhân viên
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.router.navigate(['EditEmployee', userId]);
    }
  }

  AddEmployee() {
    this.router.navigate(['AddEmployee']);
  }

  ProjectClick() {
    this.router.navigate(['Project']);
  }
  TaskClick() {
    this.router.navigate(['Task']);
  }
  LoginClick() {
    this.router.navigate(['Login']);
  }
  isLogin() {
    return this.auth.isLogin();
  }
  logout() {
    this.router.navigate(['Login']);
    return this.auth.logout();
  }
  checkRole() {
    const role = localStorage.getItem('role_id');
    const fn = localStorage.getItem('name');
    const id = localStorage.getItem('user_id');

    return role === '1' ? `Leader: ${fn}` : `Member: ${fn}`;
  }
}
