import { Component, OnInit } from '@angular/core';
import { BrowserQRCodeReader } from '@zxing/browser';
import { NavController } from '@ionic/angular';
import { Geolocation, GeolocationPosition } from '@capacitor/geolocation';
import { StorageService } from 'src/app/services/storage.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {
  scannedQRCode: string = '';
  currentLocation: string = '';
  authenticatedUser: any;
  fotoURL: SafeResourceUrl | null = null;

  constructor(
    private navCtrl: NavController,
    private storageService: StorageService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    // Inicialización del componente
    const fotoURLFromLocalStorage = localStorage.getItem('foto');
    if (fotoURLFromLocalStorage) {
      this.fotoURL = this.sanitizer.bypassSecurityTrustResourceUrl(fotoURLFromLocalStorage);
    }

    const codeReader = new BrowserQRCodeReader();
    const videoElement = document.getElementById('videoElement') as HTMLVideoElement;

    // Configuración del lector de códigos QR
    codeReader
      .decodeFromVideoDevice(undefined, videoElement, (result, err) => {
        if (result) {
          this.scannedQRCode = result.getText();
          console.log('Código QR escaneado:', this.scannedQRCode);
        }
        if (err) {
          console.error('Error al escanear:', err);
        }
      })
      .catch((err) => {
        console.error('Error al iniciar la cámara:', err);
      });

    // Obtener la ubicación actual
    this.getCurrentLocation();

    // Obtener detalles del usuario autenticado desde el StorageService
    this.authenticatedUser = this.storageService.obtenerUsuario(); // Ajustar según la implementación real
  }

  // Función para obtener la ubicación actual
  async getCurrentLocation() {
    try {
      const coordinates: GeolocationPosition = await Geolocation.getCurrentPosition();
      this.currentLocation = `Latitud: ${coordinates.coords.latitude}, Longitud: ${coordinates.coords.longitude}`;
      console.log('Ubicación actual:', this.currentLocation);
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
    }
  }

  // Función para navegar hacia atrás
  navigateLeft() {
    this.navCtrl.back();
  }

  // Función para abrir un enlace externo
  openLink(url: string) {
    if (url) {
      window.open(url, '_blank');
    }
  }
}
