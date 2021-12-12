// import { Directive, forwardRef, Injectable } from '@angular/core';
// import { AsyncValidator, AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
// import { AuthService } from '../services/auth.service';
// import { Observable, of } from 'rxjs';

// @Injectable({ providedIn: 'root' })
// export class UniqueEmailValidator implements AsyncValidator {
//   constructor(private authService: AuthService) { }

//   validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
//       return this.authService.getUserByEmail(control.value).pipe(
//         map()
//       )
//   }
// }
