import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { User } from '../models/User.model';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users: User[] = [];
  private loginUrl = 'http://localhost:3000/api/auth/login';
  private url = 'http://localhost:3000/api/auth/users';

  constructor(private http: HttpClient) { }

  addUser(user: User) {
    return this.http.post<User>('http://localhost:3000/api/auth/signup', user, httpOptions)
  }

  loginUser(email: string, password: string) {
    return this.http.post<any>('http://localhost:3000/api/auth/login', { email: email, password: password })
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}`)
      .pipe(map(u => {
        return u;
      }),
        tap((emailUsers: any) => console.log(emailUsers))
      )
  }

  getUserByEmail(email: string) {
    return this.http.get<any[]>('http://localhost:3000/api/auth/users/?=' + email)
  }

  // getUserByEmail(email: string): Observable<boolean> {
  //   const emailExist = this.http.get<any[]>(`${this.url}?email=${email}`)
  //     .pipe(map(userEmail => {
  //       const isTaken = userEmail.includes(email);
  //       return of(isTaken).pipe(delay(400))
  //     }))
  // }

  // Save user info in localStorage
  newUserSession(userInfo: any) {
    let userSession = this.getUserSession();
    userSession.push(userInfo);
    this.saveSessionUser(userSession);
  }

  // Get user info in localStorage
  getUserSession() {
    let userSession = localStorage.getItem('userSession');

    if (userSession == null) {
      return [];
    } else {
      console.log(userSession);
      return JSON.parse(userSession);
    }
  }

  // Save new session user
  saveSessionUser(userSession: any) {
    localStorage.setItem('userSession', JSON.stringify(userSession));
  }

  // Clear localStorage
  clearSession() {
    localStorage.clear();
  }
}
