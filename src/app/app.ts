import { Component } from '@angular/core';
import { RegistroComponent } from './components/registro/registro';
import { PasatiemposComponent } from './components/pasatiempos/pasatiempos';
import { InventarioComponent } from './components/inventario.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RegistroComponent, PasatiemposComponent, InventarioComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}