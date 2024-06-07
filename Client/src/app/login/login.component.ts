import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  errorMessage: string = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  xulyDN(data: any) {
    console.log(data, data.email, data.password);
    this.auth.login(data.email, data.password).subscribe(
      (res) => {
        var d = JSON.parse(res);
        const expiresAt = moment().add(d.expiresIn, 'second');
        localStorage.setItem('id_token', d.idToken);
        localStorage.setItem('role_id', d.role_id);
        localStorage.setItem('user_id', d.user_id);
        localStorage.setItem('name', d.name);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
        this.toastr.success('Logged in successfully!', 'Success');
        this.router.navigate(['/Home']);
      },
      (error) => {
        console.log('oops', error);
        this.toastr.error('Wrong account or password!', 'Error');
      }
    );
  } // xulyDN
}
