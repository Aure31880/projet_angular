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
  user!: User[] | [];
  session = Array();
  constructor(private forumService: ForumService,
    private authService: AuthService) { }

  commentList = this.forumService.getAllPost();

  ngOnInit(): void {
    this.UserComment();
    this.getSessionInfo();
  }

  getSessionInfo() {
    const info = this.authService.getUserSession();
    console.log(info[0]);
    for (let data of info[0]) {
      const id = data.id;
      const first = data.firstName;
      const name = data.lastName;
      let arr = {
        id: id,
        firstName: first,
        lastName: name,
      }
      this.session.push(arr)
    }
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
