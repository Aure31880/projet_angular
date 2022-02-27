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
  imagePreview!: string;
  file!: File;


  constructor(
    private forumService: ForumService,
    private authService: AuthService,
    private fb: FormBuilder
  ) { }

  commentList = this.forumService.getAllPost();

  ngOnInit(): void {
    const test = this.forumService.getAllPost();
    console.log(test);

    this.authService.getToken()
    this.isAdminDeleteBtn()
    this.getSessionInfo();
    this.postComment = this.fb.group({
      comment: [''],
      imageUrl: ['']
    });
  }

  getSessionInfo() {
    let arrSession = [];
    const info = this.authService.getUserSession();
    console.log(info[0].userInfo);
    const infoUser = info[0].userInfo;
    arrSession.push(infoUser);
    this.session = arrSession;
    console.log(this.session);

    // let arr = null;
    // for (let data of info[0].userInfo) {
    //   const id = data.id;
    //   const first = data.firstName;
    //   const name = data.lastName;
    //   const admin = data.admin;

    //   arr = {
    //     id: id,
    //     firstName: first,
    //     lastName: name,
    //     admin: admin
    //   }
    //   this.session.push(arr)
    // }
  }

  onSubmitPost() {
    let arrPostToSend = null;
    const comment = this.postComment.get('comment')?.value;
    const imageUrl = this.postComment.get('imageUrl')?.value;
    const imageFile = this.file;

    console.log(imageFile);


    const user = this.session;
    console.log(user);

    const idUser = user[0].id;
    console.log(idUser);
    arrPostToSend = {
      idUser: idUser,
      comment: comment,
      imageUrl: imageFile.name
    }
    this.forumService.createPost(arrPostToSend, imageFile)
      .subscribe((res: any) => {
        Swal.fire({
          icon: "success",
          title: "Ajout commentaire",
          text: "Votre commentaire à bien été ajouté",
          timer: 3000
        })
        return location.reload()
      })
    // for (let el of user) {
    //   const idUser = el.id;
    //   arrPostToSend = {
    //     idUser: idUser,
    //     comment: comment,
    //   }
    //   this.forumService.createPost(arrPostToSend)
    //     .subscribe(res => {
    //       Swal.fire({
    //         icon: "success",
    //         title: "Ajout commentaire",
    //         text: "Votre commentaire à bien été ajouté",
    //         timer: 3000
    //       })
    //       return location.reload()
    //     })
    // }
  }

  onImagePick(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    // console.log(file);

    if (file) {
      this.file = file
    }
    //   // this.file = file;
    //   this.postComment.get('imageUrl')?.patchValue(file?.name);
    //   this.postComment.get('imageUrl')?.updateValueAndValidity();
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     console.log(reader);

    //     if (this.postComment.get('imageUrl')?.valid) {
    //       this.imagePreview = reader.result as string;
    //     }
    //   };
    //   reader.readAsDataURL(file);
    // }

  }

  //   this.postComment.get('imageUrl')?.patchValue(file);
  //   this.postComment.get('imageUrl')?.updateValueAndValidity();
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     if (this.postComment.get('imageUrl')?.valid) {
  //       this.imagePreview = reader.result as string;
  //     }
  //   };
  //   reader.readAsDataURL(file);
  // }

  isAdminDeleteBtn() {
    const userSession = this.authService.getUserSession();
    console.log(userSession);

    const isAdmin = userSession[0].admin;
    if (isAdmin === 1) {
      return 'flex';
    } else {
      return 'none';
    }
  }

  deletePost(post: any) {
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

