import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Forum } from '../models/Forum.forum';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'multipart/form-data',
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
        console.log(data)
        return data;
      }),
        tap((postUser: any) => console.log(postUser))
      )
  }

  createPost(forum: Forum, image: File) {
    const postData = new FormData()
    postData.append('forum', JSON.stringify(forum));
    console.log(forum);

    postData.append('image', image);
    console.log(postData);

    return this.http.post<Forum>('http://localhost:3000/api/forum', postData);
  }

  deletePost(postId: number): Observable<Forum> {
    return this.http.delete<Forum>('http://localhost:3000/api/forum/' + postId)
  }

}
