import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Forum } from '../models/Forum.forum';
import { User } from '../models/User.model';
import { AuthService } from '../services/auth.service';
import { ForumService } from '../services/forum.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
})
export class ForumComponent implements OnInit {
  postComment!: FormGroup;
  user!: User[] | [];
  forum!: Forum[] | [];
  session = Array();

  constructor(private forumService: ForumService,
    private authService: AuthService,
    private fb: FormBuilder) { }

  commentList = this.forumService.getAllPost();

  ngOnInit(): void {
    this.isAdminDeleteBtn()
    this.getSessionInfo();
    this.postComment = this.fb.group({
      comment: ['',
        Validators.required, // sync validator
      ]
    });
  }

  getSessionInfo() {
    const info = this.authService.getUserSession();
    let arr = null;
    console.log(info[0].userInfo);
    for (let data of info[0].userInfo) {
      const id = data.id;
      const first = data.firstName;
      const name = data.lastName;
      const admin = data.admin;

      arr = {
        id: id,
        firstName: first,
        lastName: name,
        admin: admin
      }
      this.session.push(arr)
    }
  }

  onSubmitPost() {
    let arrPostToSend = null;
    const comment = this.postComment.get('comment')?.value;

    const user = this.session;
    for (let el of user) {
      const idUser = el.id;
      arrPostToSend = {
        idUser: idUser,
        comment: comment
      }
      console.log(arrPostToSend);
      console.log(this.postComment.value);

      this.forumService.createPost(arrPostToSend)
        .subscribe(res => {
          Swal.fire({
            icon: "success",
            title: "Ajout commentaire",
            text: "Votre commentaire à bien été ajouté",
            timer: 3000
          })
          return location.reload()
        })
    }
  }

  isAdminDeleteBtn() {
    const userSession = this.authService.getUserSession();

    const isAdmin = userSession[0].userInfo.admin;
    if (isAdmin === 1) {
      return 'flex';
    } else {
      return 'none';
    }
  }

  deletePost(post: any) {
    console.log(post.id);
    this.forumService.deletePost(post.id)
      .subscribe(res => {
        Swal.fire({
          title: 'Êtes-vous sur?',
          text: "Supprimer commentaire",
          icon: 'info',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmez!'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'Supprmer !',
              text: 'le commentaire à été supprimé.',
              icon: 'success',
              timer: 5000
            })
            return location.reload()
          }
        })
      })
  }
}

