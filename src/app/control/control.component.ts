import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TanqueoService, Tanqueo, NuevoTanqueo } from '../services/tanqueo.service';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [CommonModule, FormsModule, NgChartsModule],
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

  // --- Propiedades del Formulario ---
  fecha = new Date().toISOString().slice(0, 10);
  litros: number | null = null;
  precioLitro: number | null | undefined = undefined;
  odometro: number | null = null;

  // Lista de tanqueos
  tanqueos: Tanqueo[] = [];

  // --- Propiedades del Gráfico ---
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Eficiencia (km/L)',
        fill: true,
        tension: 0.3,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true
  };

  constructor(private tanqueoService: TanqueoService) { }

  ngOnInit(): void {
    this.cargarTanqueos();
  }

  cargarTanqueos(): void {
    this.tanqueoService.getTanqueos().subscribe(data => {
      console.log('Datos recibidos de la API:', data);
      this.tanqueos = data;
      this.actualizarGrafico();
    });
  }

  actualizarGrafico(): void {
    // Un gráfico de líneas necesita al menos 2 puntos para ser útil
    if (this.tanqueos.length < 2) {
      this.lineChartData.labels = [];
      this.lineChartData.datasets[0].data = [];
      return;
    }

    // La API devuelve los datos en orden descendente, los invertimos para el gráfico
    const datosGrafico = [...this.tanqueos].reverse();

    // Filtramos el primer registro, ya que su consumo es 0 y no es un dato real de eficiencia
    const datosReales = datosGrafico.filter(t => t.consumo_parcial && t.consumo_parcial > 0);
    
    // Asignamos las etiquetas (fechas) y los datos (consumo)
    this.lineChartData.labels = datosReales.map(t => new Date(t.fecha).toLocaleDateString());
    this.lineChartData.datasets[0].data = datosReales.map(t => t.consumo_parcial!);
  }

  // --- Getters para Cálculos en Vivo ---
  get odometroPrev(): number | null {
    if (this.tanqueos.length === 0) return null;
  return this.tanqueos[0].odometro; 
  }

  get litrosPrev(): number {
    if (this.tanqueos.length === 0) return 0;
    return this.tanqueos[0].litros;
  }

  get costoCargaCalc(): number {
    if (!this.litros || !this.precioLitro) return 0;
    return this.litros * this.precioLitro;
  }

  get consumoParcialCalc(): number {
    if (!this.litros || !this.odometro || this.litros <= 0 || !this.litrosPrev ) return 0;
    if (this.odometroPrev !== undefined && this.odometroPrev !== null) {
        if (this.odometro <= this.odometroPrev) {
            return 0;
        }
    }
    const kmRecorridos = this.odometro - (this.odometroPrev ?? 0);
    if (kmRecorridos <= 0) return 0;
    return kmRecorridos / this.litrosPrev;
  }

  get costoKmCalc(): number {
    const odometroPrevio = this.odometroPrev ?? 0;
    if (!this.odometro || !this.costoCargaCalc || this.odometro <= odometroPrevio) {
        return 0;
    }
    const kmRecorridos = this.odometro - odometroPrevio;
    return this.costoCargaCalc / kmRecorridos;
  }

  guardarTanqueo(): void {
    if (!this.litros || !this.precioLitro || this.odometro === null) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    // ---> VALIDACIÓN AÑADIDA <---
    // Obtenemos el odómetro previo y validamos que el nuevo sea mayor.
    const odometroAnterior = this.odometroPrev;
    if (odometroAnterior !== undefined && odometroAnterior !== null) {
    if (this.odometro <= odometroAnterior) {
        alert('Error: El odómetro debe ser estrictamente mayor al del último registro.');
        return;
    }
}

    const esPrimerRegistro = this.tanqueos.length === 0;

    const nuevoTanqueo: NuevoTanqueo = {
      fecha: this.fecha,
      litros: this.litros,
      precio_litro: this.precioLitro,
      odometro: this.odometro,
      costo_carga: this.costoCargaCalc,
      consumo_parcial: esPrimerRegistro ? 0 : this.consumoParcialCalc,
      costo_km: esPrimerRegistro ? 0 : this.costoKmCalc,
    };

    this.tanqueoService.addTanqueo(nuevoTanqueo).subscribe(() => {
      this.cargarTanqueos();
      this.resetForm();
    });
  }

  eliminarTanqueo(id: string): void {
    if (!confirm('¿Estás seguro?')) return;
    this.tanqueoService.deleteTanqueo(id).subscribe(() => {
      this.cargarTanqueos();
    });
  }

  resetForm(): void {
    this.fecha = new Date().toISOString().slice(0, 10);
    this.litros = null;
    this.precioLitro = null;
    this.odometro = null;
  }
}