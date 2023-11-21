import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private afAuth: AngularFireAuth, private router: Router) {}

  canActivate() {
    return this.afAuth.authState.pipe(
      map(user => {
        if (user) {
          return true; // Usuario autenticado, permitir el acceso
        } else {
          this.router.navigate(['/login']); // Redirige a la página de inicio de sesión si no está autenticado
          return false;
        }
      })
    );
  }
}
