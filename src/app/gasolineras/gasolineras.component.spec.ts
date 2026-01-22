import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GasolinerasComponent } from './gasolineras.component';

describe('GasolinerasComponent', () => {
  let component: GasolinerasComponent;
  let fixture: ComponentFixture<GasolinerasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GasolinerasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GasolinerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
