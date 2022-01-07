import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User.model';
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

  // userList = this.authService.getAllUsers();

  ngOnInit(): void {

    this.signUpForm = this.fb.group({
      firstName: ['',
        [Validators.required,
        Validators.minLength(2),
        Validators.pattern('[A-Z]+[a-zàáâãäåòóôõöøèéêëçìíîïùúûüÿñ]*')
        ],
      ],
      lastName: ['',
        [Validators.required,
        Validators.minLength(2),
        Validators.pattern('[A-Z]+[a-zàáâãäåòóôõöøèéêëçìíîïùúûüÿñ]*')
        ]
      ],
      email: ['',
        [Validators.required,
        Validators.email]
      ],
      password: ['',
        [Validators.required,
        Validators.minLength(8)]
      ],
    });
  }

  get firstName() { return this.signUpForm.get('firstName') }
  get lastName() { return this.signUpForm.get('lastName') }
  get email() { return this.signUpForm.get('email') }
  get password() { return this.signUpForm.get('password') }

  onSubmitForm() {
    const firstName = this.signUpForm.get('firstName')?.value;
    const lastName = this.signUpForm.get('lastName')?.value;
    const email = this.signUpForm.get('email')?.value;
    const password = this.signUpForm.get('password')?.value;

    this.authService.getUserByEmail(email)
      .subscribe(userExist => {
        const userEmail = userExist.filter(el => el.email === email)
        console.log(userEmail);

        if (userEmail.length != 0) {
          Swal.fire({
            title: 'Erreur email',
            text: 'Email déjà utilisé !',
            icon: 'error',
            timer: 2000
          })
        }
        else {
          this.authService.addUser(this.signUpForm.value)
            .subscribe(res => {
              Swal.fire({
                icon: 'success',
                title: 'Inscription réussi',
                text: 'Vous êtes inscirts !',
              })
              this.signUpForm.reset();
              this.router.navigate(['login'])
            })
        }
      })
  }
}
