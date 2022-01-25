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
        return data;
      }),
        tap((postUser: any) => console.log(postUser))
      )
  }

  createPost(forum: Forum) {
    return this.http.post<Forum>('http://localhost:3000/api/forum', forum);
  }

  // createPostWithFile(forum: Forum, image: File) {
  //   // const commentData = new FormData();
  //   // commentData.append('comment', JSON.stringify(forum));
  //   // commentData.append('image', image);
  //   // this.http.post<any>('http://localhost:3000/api/stuff', commentData)
  //   //   .pipe(map(data => {
  //   //     return data
  //   //   }))

  //   return this.http.post('http://localhost:3000/api/forum', forum)

  // }

  deletePost(postId: number): Observable<Forum> {
    return this.http.delete<Forum>('http://localhost:3000/api/forum/' + postId)
  }

}
