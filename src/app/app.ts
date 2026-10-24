import { Component } from '@angular/core';
import { RegistroComponent } from './components/registro/registro';
import { PasatiemposComponent } from './components/pasatiempos/pasatiempos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RegistroComponent, PasatiemposComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App { }
