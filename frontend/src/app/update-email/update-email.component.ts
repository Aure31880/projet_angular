import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/User.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-update-email',
  templateUrl: './update-email.component.html',
  styleUrls: ['./update-email.component.css']
})
export class UpdateEmailComponent implements OnInit {
  updateEmail!: FormGroup;
  user!: User[] | [];


  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.updateEmail = this.fb.group({
      email: ['',
        Validators.required,
        Validators.email
      ],
      newEmail: ['',
        Validators.required,
        Validators.email
      ],
      confirmEmail: ['',
        Validators.required,
        Validators.email
      ],
    })
  }

}
