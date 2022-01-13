import { Injectable } from '@angular/core';
import { PostImage } from '../models/PostImage.model';
import { map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PostImageService {
  postImg: PostImage[] = []

  constructor(
    private http: HttpClient,
  ) { }

  getAllPosts(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/posts')
      .pipe(map(data => {
        return data;
      }),
        tap((postUser: any) => console.log(postUser))
      )
  }

  createPost(post: PostImage) {
    return this.http.post<PostImage>('http://localhost:3000/api/forum', post);
  }

}
