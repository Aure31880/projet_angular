import { Component, OnInit } from '@angular/core';
import { Forum } from '../models/Forum.forum';
import { User } from '../models/User.model';
import { AuthService } from '../services/auth.service';
import { ForumService } from '../services/forum.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
})
export class ForumComponent implements OnInit {
  forum!: Forum[] | [];
  user!: User[] | [];

  constructor(private forumService: ForumService,
    private authService: AuthService) { }


  commentList = this.forumService.getAllPost();

  ngOnInit(): void {
    this.UserComment();
  }

  UserComment() {
    this.commentList
      .subscribe(res => {
        for (let id of res) {
          const iduser = id.idUser;

          this.authService.getAllUsers()
            .subscribe(res => {
              this.user = res.filter(el => el.id === iduser)
              return this.user;
            })
        }
      })


  }


}
