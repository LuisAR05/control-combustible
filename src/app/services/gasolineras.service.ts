import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Marca {
  id?: string;
  nombre: string;
    logoUrl: string;
}

@Injectable({ providedIn: 'root' }) 
export class GasolinerasService {
    
  private readonly BASE_URL = 'https://6916d460a7a34288a27e884e.mockapi.io';

  private readonly apiUrl = `${this.BASE_URL}/gasolineras1`;

  constructor(private http: HttpClient) {}

  getMarcas(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.apiUrl).pipe(
      tap(data => console.log('Datos CRUDOS recibidos de MockAPI:', data))
    );
  }
}
