import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { StorageService } from 'src/app/services/storage.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { RegionesService } from 'src/app/services/region.service';
import { ComunaService } from 'src/app/services/comuna.service';
import { NavController } from '@ionic/angular';

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
  regiones: any[] = [];
  selectedRegion: any = null;
  comunas: any [] = [];
  selectedComuna: any = null;



  constructor(
    private auth: AngularFireAuth,
    private helper: HelperService,
    private router: Router,
    private storageService: StorageService,
    private db: AngularFireDatabase,
    private regionesService: RegionesService,
    private comunasService: ComunaService,
    private navCtrl: NavController,

  ) { }

  ngOnInit() {
    this.userView();
    this.loadRegiones();
    this.loadComunas();
  }

  loadRegiones() {
    this.regionesService.getRegiones().subscribe(
      (data: any[]) => {
        this.regiones = data;
        console.log('Regiones cargadas:', this.regiones);
      },
      (error) => {
        console.error('Error al cargar las regiones', error);
      }
    );
  }
  loadComunas() {
    this.comunasService.getComunas().subscribe(
      (data: any[]) => {
        console.log('Respuesta de la API:', data);
        this.comunas = data;
      },
      (error: any) => {
        console.error('Error al cargar las comunas', error);
      }
    );
  }
  
  
  
  onRegionChange(event: any) {
    console.log('Región seleccionada:', this.selectedRegion);
  }
  onComunaChange(event: any) {
    console.log('Comuna seleccionada:', this.selectedComuna);
  }

  async userView() {
    console.log("USUARIOS STORAGE", await this.storageService.obtenerUsuario());
  }

  async registro() {
    const loader = await this.helper.showLoader("Cargando");
    try {
      const request = await this.auth.createUserWithEmailAndPassword(this.email, this.contrasena);
      const user = [{
        correo: this.email,
        nombre: this.nombre,
        apellido: this.apellido,
        rut: this.rut,
        contrasena: this.contrasena,
        region: this.regiones,
        comuna: this.comunas
      }];
      this.storageService.guardarUsuario(user);

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
  navigateLeft() {
    this.navCtrl.back();
  }
}
