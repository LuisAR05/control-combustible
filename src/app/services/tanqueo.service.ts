import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// interfaz para los datos del tanqueo recibidos de la API
export interface Tanqueo {
  _id?: string;
  fecha: string;
  litros: number;
  precio_litro: number;
  odometro: number;
  costo_carga: number;
  consumo_parcial?: number;
  costo_km?: number;
}

export interface NuevoTanqueo {
  fecha: string;
  litros: number;
  precio_litro: number;
  odometro: number;
  costo_carga: number;
  consumo_parcial?: number;
  costo_km?: number;
}

@Injectable({
  providedIn: 'root'
})
export class TanqueoService {
  // Ahora apuntamos al puerto 4000 de Node
  private apiUrl = 'http://localhost:4000/api/tanqueos'; 

  constructor(private http: HttpClient) { }

  getTanqueos(): Observable<Tanqueo[]> {
    return this.http.get<Tanqueo[]>(this.apiUrl);
  }

  addTanqueo(tanqueo: any): Observable<any> {
    // Ya no necesitas apuntar a un archivo .php, solo a la raíz de la API
    return this.http.post(this.apiUrl, tanqueo);
  }

  deleteTanqueo(id: string): Observable<any> {
    // En REST, el ID va en la URL: /api/tanqueos/12345abcde
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}