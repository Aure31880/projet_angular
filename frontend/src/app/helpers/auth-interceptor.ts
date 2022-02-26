import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  //Avant l'envoi d'une requête HTTP l'interceptor va ajouter le token à l'authentification
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //Récupération du token
    const token = this.authService.token;


    // On clone la requête en y ajoutant un headers Authorization avec la chaine de caractères Bearer
    req = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      },
    });

    return next.handle(req);
  }
}
