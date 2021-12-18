import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService,
    private route: Router) { }

  ngOnInit(): void {

  }



  getNavBarUser() {
    const test = this.authService.getUserSession()
    if (test.length === 0) {
      return 'none';
    } else {
      return 'flex';
    }
  }

  getNavBar() {
    const test = this.authService.getUserSession()
    if (test.length === 0) {
      return 'flex';
    } else {
      return 'none';
    }
  }

  onDisconnect() {
    this.authService.clearSession();
    this.route.navigate(['login']);
  }
}
