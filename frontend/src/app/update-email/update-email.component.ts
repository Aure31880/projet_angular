import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/User.model';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-email',
  templateUrl: './update-email.component.html',
  styleUrls: ['./update-email.component.css']
})
export class UpdateEmailComponent implements OnInit {
  updateEmailForm!: FormGroup;
  user!: User[] | [];


  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.updateEmailForm = this.fb.group({
      email: ['',
        Validators.required,
      ],
      newEmail: ['',
        Validators.required,
      ],
      confirmEmail: ['',
        Validators.required,
      ],
    })
  }

  submitUpdateEmail() {
    const oldEmail = this.updateEmailForm.get('email')?.value;
    const newEmail = this.updateEmailForm.get('newEmail')?.value;
    const confirmEmail = this.updateEmailForm.get('confirmEmail')?.value;
    const id = this.authService.getUserSession();

    const idUser = id[0].userInfo[0].id;

    let arrForUpdate = {
      idUser: idUser,
      email: oldEmail,
      newEmail: newEmail
    }
    if (newEmail == confirmEmail) {
      // Update methode from authService
      this.authService.updateEmail(idUser, arrForUpdate)
        .subscribe(res => {
          Swal.fire('Adresse email modifié !')
        })
    } else {
      Swal.fire('Email non similaire !')
    }
  }

  get email() { return this.updateEmailForm.get('email') }
  get newEmail() { return this.updateEmailForm.get('newEmail') }
  get confirmEmail() { return this.updateEmailForm.get('confirmEmail') }

}
