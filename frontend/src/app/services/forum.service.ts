import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Forum } from '../models/Forum.forum';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  forum: Forum[] = [];

  constructor(private http: HttpClient) { }


  getAllPost(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/forum')
      .pipe(map(data => {
        return data;
      }),
        tap((postUser: any) => console.log(postUser))
      )
  }

  createPost(forum: Forum) {
    return this.http.post<Forum>('http://localhost:3000/api/forum', forum);
  }

}
