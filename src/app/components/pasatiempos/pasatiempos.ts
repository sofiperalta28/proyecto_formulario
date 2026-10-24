import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-pasatiempos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pasatiempos.html',
  styleUrl: './pasatiempos.css'
})
export class PasatiemposComponent {
  private formBuilder = inject(FormBuilder);

  // FormArray inicializado con un único control vacío
  pasatiemposForm: FormGroup = this.formBuilder.group({
    pasatiempos: this.formBuilder.array([this.formBuilder.control('')])
  });

  // Getter obligatorio para acceder a la propiedad como FormArray
  get pasatiempos(): FormArray {
    return this.pasatiemposForm.get('pasatiempos') as FormArray;
  }

  // Método para agregar un control dinámico
  agregarPasatiempo(): void {
    this.pasatiempos.push(this.formBuilder.control(''));
  }
}
