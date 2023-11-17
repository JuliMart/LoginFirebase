import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  getUsuarioData(): import("rxjs").Observable<any> {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
