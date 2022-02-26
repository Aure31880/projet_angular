import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../models/User.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  updatePassForm!: FormGroup;
  user!: User[] | [];

  constructor(private authService: AuthService,
    private route: Router,
    private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.authService.getToken()
    this.getUserInfo();
    this.updatePassForm = this.fb.group({
      password: ['',
        Validators.required
      ],
      newPassword: ['',
        Validators.required
      ],
      confirmPassword: ['',
        Validators.required
      ],
    })
  }

  getUserInfo() {
    let arrUser = []
    const userInfo = this.authService.getUserSession();
    const user = userInfo[0].userInfo;
    arrUser.push(user)
    this.user = arrUser
    console.log(this.user)
  }

  deleteAccount() {
    this.authService.getAllUsers()
      .subscribe(res => {
        if (res) {
          Swal.fire({
            title: 'Êtes-vous sur?',
            text: "Supprimer le compte",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmez!'
          }).then((result) => {
            if (result.isConfirmed) {
              this.authService.deleteUserAccount(this.user[0].id)
                .subscribe(result => {
                  Swal.fire({
                    title: 'Supprimer !',
                    text: 'Le compte à été supprimé.',
                    icon: 'success',
                    timer: 5000
                  })
                })
              this.authService.clearSession();
              this.route.navigate(['login']);
            }
          })
        }
      })
  }

  submitUpdatePass() {
    // Récupérer les values des inputs
    const oldPass = this.updatePassForm.get('password')?.value;
    const newPass = this.updatePassForm.get('newPassword')?.value;
    const confirmPass = this.updatePassForm.get('confirmPassword')?.value;
    const id = this.authService.getUserSession();
    const idUser = id[0].userInfo.id;

    let arrForUpdate = {
      idUser: idUser,
      oldPassord: oldPass,
      newPassword: newPass
    }

    // Vérifier si le newPassword et le confirmPassword correspondent
    if (newPass == confirmPass) {
      this.authService.updatePass(idUser, oldPass, newPass)
        .subscribe(res => {
          Swal.fire('Mot de passe modifié !')
          return location.reload()
        })
    } else {
      Swal.fire('Les mots de passe ne sont pas identiques !')
    }
  }

  get password() { return this.updatePassForm.get('password') }
  get newPassword() { return this.updatePassForm.get('newPassword') }
  get confirmPassword() { return this.updatePassForm.get('confirmPassword') }

}
