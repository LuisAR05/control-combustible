import { Routes } from '@angular/router';
import { ControlComponent } from './control/control.component';
import { GasolinerasComponent } from './gasolineras/gasolineras.component';

export const routes: Routes = [
  {
    path: 'control',
    component: ControlComponent
  },
  {
    path: 'gasolineras',
    component: GasolinerasComponent
  },
  // Rutas de redirección
  {
    path: '',
    redirectTo: '/control',
    pathMatch: 'full'
  },
  {
    path: '**', // Cualquier otra ruta no encontrada
    redirectTo: '/control'
  }
];