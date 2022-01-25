import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { User } from '../models/User.model';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Authorization':
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users: User[] = [];
  private loginUrl = 'http://localhost:3000/api/auth/login';
  private url = 'http://localhost:3000/api/auth/users';
  currentUser: any;
  token: any;

  constructor(private http: HttpClient,) { }


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
      })
        ,
        tap((emailUsers: any) => console.log(emailUsers))
      )
  }

  getUserByEmail(email: string) {
    return this.http.get<any[]>('http://localhost:3000/api/auth/users/?=' + email)

  }

  // getUserById(id: number) {
  //   return this.http.get<any[]>('http://localhost:3000/api/auth/users/?=' + id)

  // }

  deleteUserAccount(idUser: number) {
    return this.http.delete<User>('http://localhost:3000/api/auth/users/' + idUser)

  }

  updatePass(idUser: number, oldPassword: string, newPassword: string) {
    return this.http.put<User>('http://localhost:3000/api/auth/users/' + idUser, { oldPassword, newPassword })
  }

  updateEmail(idUser: number, infoToUpdate: any) {
    return this.http.put<any>('http://localhost:3000/api/auth/users/email/' + idUser, { infoToUpdate })
  }

  // LOCAL STORAGE SESSION USER

  // Save user info in localStorage
  newUserSession(userInfo: any) {
    let userSession = this.getUserSession();
    userSession.push(userInfo);
    this.saveSessionUser(userSession);
  }

  // Get user info in localStorage
  getUserSession() {
    let userSession = localStorage.getItem('currentSession');

    if (userSession == null) {
      return [];
    } else {
      // console.log(userSession);
      return JSON.parse(userSession);
    }
  }

  // Save new session user
  saveSessionUser(userSession: any) {
    localStorage.setItem('currentSession', JSON.stringify(userSession));
  }

  // Clear localStorage
  clearSession() {
    localStorage.clear();
  }

  getToken() {
    const session = this.getUserSession()[0].token;
    this.token = session
    console.log(this.token);

  }
}
