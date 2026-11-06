import { Component, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
}

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styles: [`
    :host {
      display: block;
    }
    .inventario-card {
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 16px;
      background-color: #fff;
      max-width: 400px;
      box-sizing: border-box;
    }
    .inventario-card h2 {
      margin-top: 0;
    }
    .filtro-input {
      width: 100%;
      padding: 6px 8px;
      margin: 10px 0 15px 0;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
    }
    .lista-productos {
      padding-left: 20px;
      margin-bottom: 0;
    }
    .lista-productos li {
      margin-bottom: 8px;
    }
    .btn-stock {
      margin-left: 8px;
      cursor: pointer;
    }
  `],
  template: `
    <div class="inventario-card">
      <h2>Gestión de Inventario</h2>

      <!-- Resumen de Inventario -->
      <div class="resumen">
        <p><strong>Valor Total del Inventario:</strong> \${{ valorTotalInventario() }}</p>
      </div>

      <!-- Buscador por nombre -->
      <div class="filtro">
        <input 
          class="filtro-input"
          type="text" 
          placeholder="Buscar producto por nombre..." 
          [ngModel]="filtro()" 
          (ngModelChange)="filtro.set($event)" 
        />
      </div>

      <!-- Lista de Productos -->
      <ul class="lista-productos">
        @for (producto of productosFiltrados(); track producto.id) {
          <li>
            <span>
              <strong>{{ producto.nombre }}</strong> - \${{ producto.precio }} (Stock: {{ producto.stock }})
            </span>
            <button 
              class="btn-stock"
              [disabled]="producto.stock <= 0" 
              (click)="reducirStock(producto.id)">
              Reducir Stock
            </button>
          </li>
        } @empty {
          <li>No se encontraron productos que coincidan con la búsqueda.</li>
        }
      </ul>
    </div>
  `
})
export class InventarioComponent {
  // 1: Estado Base (signal)
  productos = signal<Producto[]>([
    { id: 1, nombre: 'Laptop Pro', precio: 1200, stock: 5 },
    { id: 2, nombre: 'Monitor 4K', precio: 300, stock: 12 },
    { id: 3, nombre: 'Teclado Mecánico', precio: 100, stock: 8 },
    { id: 4, nombre: 'Mouse Inalámbrico', precio: 50, stock: 15 }
  ]);

  filtro = signal<string>('');

  // 2: Cálculos Automáticos (computed)
  productosFiltrados = computed(() => {
    const busqueda = this.filtro().toLowerCase().trim();
    return this.productos().filter(p => 
      p.nombre.toLowerCase().includes(busqueda)
    );
  });

  valorTotalInventario = computed(() => {
    return this.productos().reduce((total, p) => total + (p.precio * p.stock), 0);
  });

  // 3: Persistencia Local (effect)
  constructor() {
    effect(() => {
      const cantidadTotal = this.productos().length;
      localStorage.setItem('cantidad_productos_inventario', cantidadTotal.toString());
    });
  }

  // 4: Reducir stock usando .update()
  reducirStock(productoId: number): void {
    this.productos.update(listaActual =>
      listaActual.map(p =>
        p.id === productoId && p.stock > 0
          ? { ...p, stock: p.stock - 1 }
          : p
      )
    );
  }
}