import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email:string = "";
  contrasena:string = "";

  constructor(private router:Router,
    private helperService:HelperService,
    private auth: AngularFireAuth) { }

  ngOnInit() {
    console.log("Resultado suma metodo desde un servicio:",this.helperService.sumar(10,50));
    
  }

  async login() {
    if (this.email.trim() === "") {
      this.helperService.showAlert("Debe ingresar un email", "Advertencia");
      return;
    }
    if (this.contrasena.trim() === "") {
      this.helperService.showAlert("Debe ingresar una contraseña.", "Advertencia");
      return;
    }

    try {
      const userCredential = await this.auth.signInWithEmailAndPassword(this.email, this.contrasena);
      // Autenticación exitosa, puedes redirigir a la siguiente página
      this.router.navigateByUrl("menu");
    } catch (error) {
      console.error("Error de autenticación:", error);
      this.helperService.showAlert("Credenciales no válidas.", "Error de autenticación");
    }
  }
}