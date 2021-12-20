import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Forum } from '../models/Forum.forum';


@Injectable({
  providedIn: 'root'
})
export class ForumService {
  forum: Forum[] = [];

  constructor(private http: HttpClient) { }

  getAllPost(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/forum/posts')
      .pipe(map(data => {
        return data;
      }),
        tap((postUser: any) => console.log(postUser))
      )
  }


}
