import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['',
        Validators.required],
      password: ['',
        Validators.required]
    })
  }

  onLogin() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    let userInfo = {
      email: email,
      password: password
    }

    this.loginForm.value
    this.authService.loginUser(email, password)
      .subscribe(res => {
        this.authService.newUserSession(userInfo)
        this.loginForm.reset();
        this.router.navigate(['profile'])
      })
  }

  onDisconnect() {
    this.authService.clearSession();
  }

  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }
}
