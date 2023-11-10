import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  email: string = "";
  contrasena: string = "";
  nombre: string = "";
  apellido: string = "";
  rut: string = "";

  constructor(
    private auth: AngularFireAuth,
    private helper: HelperService,
    private router: Router,
    private storageService: StorageService,
    private db: AngularFireDatabase // Agrega AngularFireDatabase
  ) { }

  ngOnInit() {
    this.userView();
  }

  async userView() {
    console.log("USUARIOS STORAGE", await this.storageService.obtenerUsuario());
  }

  async registro() {
    const loader = await this.helper.showLoader("Cargando");
    try {
      // Crea el usuario en Firebase Authentication
      const request = await this.auth.createUserWithEmailAndPassword(this.email, this.contrasena);

      // Almacena información adicional en Firebase Realtime Database
      const user = {
        correo: this.email,
        nombre: this.nombre,
        apellido: this.apellido,
        rut: this.rut,
      };

      // Utiliza un array con un solo usuario para que coincida con la estructura del servicio de almacenamiento
      this.storageService.guardarUsuario([user]);

      await this.router.navigateByUrl('login');
      await loader.dismiss();
      await this.helper.showAlert("Usuario registrado correctamente", "Información");
    } catch (error: any) {
      if (error.code == 'auth/invalid-email') {
        await this.helper.showAlert("El formato del correo no es válido.", "Error de validación");
        await loader.dismiss();
      }
    }
  }
}
