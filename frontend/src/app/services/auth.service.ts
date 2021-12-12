import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { User } from '../models/User.model';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users: User[] = [];
  private url = 'http://localhost:3000/api/auth/users';

  constructor(private http: HttpClient) { }

  addUser(user: User) {
    return this.http.post<User>('http://localhost:3000/api/auth/signup', user, httpOptions)
  }

  logUser(email: string, password: string) {
    this.http.get<any>('http://localhost:3000/api/auth/login')
      .subscribe(res => {
        const user = res.find((u: any) => {
          return u.email === email && u.password === password
        })
      })
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}`)
      .pipe(map(u => {
        const newUser = [];
        for (let user of u) {
          // console.log(user.email);
          const email = user.email;
          newUser.push({ email: email })
        }
        return newUser;
      }),
        tap((emailUsers: any) => console.log(emailUsers))
      )
  }

  getUserByEmail(email: string) {
    return this.http.get<any[]>(`${this.url}?email=${email}`)
  }

  // getUserByEmail(email: string): Observable<boolean> {
  //   const emailExist = this.http.get<any[]>(`${this.url}?email=${email}`)
  //     .pipe(map(userEmail => {
  //       const isTaken = userEmail.includes(email);
  //       return of(isTaken).pipe(delay(400))
  //     }))
  // }
}
