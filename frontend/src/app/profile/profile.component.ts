import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user!: User[] | [];
  constructor(private authService: AuthService,
    private route: Router) {

  }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    const userInfo = this.authService.getUserSession();
    for (let session of userInfo) {
      const test = session.email;
      this.authService.getAllUsers()
        .subscribe(res => {
          this.user = res.filter(el => el.email === test)
          return this.user;
        })
    }
  }

}
