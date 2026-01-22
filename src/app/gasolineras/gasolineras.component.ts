import { Component, OnInit } from '@angular/core';
import { GasolinerasService, Marca } from '../services/gasolineras.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gasolineras',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gasolineras.component.html',
  styleUrls: ['./gasolineras.component.css']
})
export class GasolinerasComponent implements OnInit {
  
  marcas$!: Observable<Marca[]>;

  constructor(private gasolinerasService: GasolinerasService) { }

  ngOnInit(): void {
    this.marcas$ = this.gasolinerasService.getMarcas();
  }
}
