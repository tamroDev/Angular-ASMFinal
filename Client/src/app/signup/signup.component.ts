// signup.component.ts
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  handleSignup(data: any) {
    console.log(data, data.firstName, data.lastName, data.email, data.password);
    this.auth
      .signup(data.firstName, data.lastName, data.email, data.password)
      .subscribe(
        (res) => {
          console.log('Đăng ký thành công', res);
          this.toastr.success('Sign Up Success!', 'Success');
          this.router.navigate(['/Login']);
        },
        (error) => {
          console.log('Đăng ký thất bại', error);
          this.toastr.error('Registration failed!', 'Error');
        }
      );
  }

  shouldShowHeader = false;
}
