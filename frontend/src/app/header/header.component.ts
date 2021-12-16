import { Component, OnInit } from '@angular/core';
import { User } from '../models/User.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user!: User[] | [];
  isAuth = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

  }

  // getSession() {
  //   const test = this.authService.getUserSession()
  //   console.log(test);


  // }



}
