import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users: User[] = [];
  private url = 'http://localhost:3000/api/auth/users';

  constructor(private http: HttpClient) { }
  // addUser(user: User) {
  // }

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

}
