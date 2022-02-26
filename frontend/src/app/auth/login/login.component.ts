import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


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
        this.authService.getUserByEmail(email)
          .subscribe(user => {
            console.log(user)
            if (user) {
              // const newSession = user.filter(el => el.email === email);
              const newSession = user;

              const userCurrent = {
                userInfo: newSession,
                token: res.token
              }

              this.authService.newUserSession(userCurrent)
              this.loginForm.reset();
              this.router.navigate(['forum'])
            }
          }, error => {
            throw new Error('Bad request')
          })
      }, error => {
        Swal.fire({
          title: 'Erreur connexion',
          text: 'Mot de passe ou identifiant incorrect !',
          icon: 'error',
          timer: 3000
        })
      })
  }

  onDisconnect() {
    this.authService.clearSession();
  }

  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }
}
