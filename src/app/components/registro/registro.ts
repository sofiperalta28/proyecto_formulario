import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class RegistroComponent {
  private formBuilder = inject(FormBuilder);
  
  //Variable para mostrar el resultado en pantalla
  mensajeResultado: string = '';

  registroForm: FormGroup = this.formBuilder.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    direccion: this.formBuilder.group({
      calle: [''],
      ciudad: ['']
    })
  });

  onSubmit(): void {
    if (this.registroForm.valid) {
      this.mensajeResultado = '¡Formulario enviado con éxito! ' + JSON.stringify(this.registroForm.value);
      console.log('Valor del formulario:', this.registroForm.value);
    } else {
      this.mensajeResultado = 'Por favor, completá los campos obligatorios (Nombre y Email válido).';
      this.registroForm.markAllAsTouched();
    }
  }

  cargarDireccionPrueba(): void {
    this.registroForm.patchValue({
      direccion: {
        calle: 'Av. Belgrano 1234',
        ciudad: 'Córdoba'
      }
    });
  }
}
