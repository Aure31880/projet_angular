import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User.model';
import { uniqueEmailValidator } from 'src/app/shared/unique-email.directive';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm !: FormGroup;
  user: User[] = [];
  editUser: User | undefined;

  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private router: Router) { }

  userList = this.authService.getAllUsers();

  ngOnInit(): void {

    this.signUpForm = this.fb.group({
      firstName: ['',
        Validators.required, // sync validator
      ],
      lastName: ['',
        Validators.required, // sync validator
      ],
      email: ['',
        [Validators.required], // sync validator
        // uniqueEmailValidator(this.authService) // async validator
      ],
      password: ['', Validators.required],
    });

    // this.signUpForm = new FormGroup({
    //   firstName: new FormControl(this.user.firstName, [
    //     Validators.required,
    //   ]),
    //   lastName: new FormControl(this.user.lastName, [
    //     Validators.required,
    //   ]),
    //   email: new FormControl(this.user.email, [
    //     Validators.required,
    //     // asyncValidators: [this.uniqueEmailValidator.validate.bind(this.uniqueEmailValidator)],

    //   ]),
    //   password: new FormControl(this.user.password, [
    //     Validators.required,
    //   ]),
    // })
  }
  get firstName() { return this.signUpForm.get('firstName') }
  get lastName() { return this.signUpForm.get('lastName') }
  get email() { return this.signUpForm.get('email') }
  get password() { return this.signUpForm.get('password') }
  initForm() {

  }

  onSubmitForm() {
    const firstName = this.signUpForm.get('firstName')?.value;
    const lastName = this.signUpForm.get('lastName')?.value;
    const email = this.signUpForm.get('email')?.value;
    const password = this.signUpForm.get('password')?.value;

    let userInfo = {
      firstName: this.signUpForm.get('firstName')?.value,
      lastName: this.signUpForm.get('lastName')?.value,
      email: this.signUpForm.get('email')?.value,
      password: this.signUpForm.get('password')?.value,
    }

    this.authService.addUser(this.signUpForm.value)
      .subscribe(res => {
        Swal.fire({
          icon: 'success',
          title: 'Inscription réussi',
          text: 'Vous êtes inscirts !',
        })
        this.signUpForm.reset();
        this.router.navigate(['login'])
        console.log(this.signUpForm.value);
      })

  }

}
