import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm !: FormGroup;
  user = User;

  constructor(private authService: AuthService) { }

  userList = this.authService.getAllUsers();

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      firstName: new FormControl(this.user.firstName, [
        Validators.required,
      ]),
      lastName: new FormControl(this.user.lastName, [
        Validators.required,
      ]),
      email: new FormControl(this.user.email, [
        Validators.required,
      ]),
      password: new FormControl(this.user.password, [
        Validators.required,
      ]),
    })
  }

  initForm() {

  }

  onSubmitForm() {
    const email = this.signUpForm.get('email')?.value;
    const userByEmail = this.authService.getUserByEmail(email)

    console.log(this.signUpForm.value);
  }

  get firstName() { return this.signUpForm.get('firstName'); }
  get lastName() { return this.signUpForm.get('lastName'); }
  get email() { return this.signUpForm.get('email'); }
  get password() { return this.signUpForm.get('password'); }

}
