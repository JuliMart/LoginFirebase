// regiones.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComunaService {
  private apiUrl = 'https://api.shipit.cl/v/regions';

  constructor(private http: HttpClient) {}

  getComunas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
