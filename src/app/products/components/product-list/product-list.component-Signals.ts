import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  Signal,
  WritableSignal,
} from '@angular/core';
import { ProductInterface } from '../../../shared/interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  providers: [ProductsService], // se coloca aquí ya que estamos haciendo que este servicio sea usado solo para este componente, si se colocara como -- providedIn: 'root', -- entonces no haría falta colocar este "providers" ya que se podría usar en cualquier parte de la aplicación

  /* también se puede colocar el html de forma directa */
  // template: `
  //   <div *ngIf="products.length > 0; else loading">
  //     <div *ngFor="let product of products">
  //       <h3>{{ product.title }}</h3>
  //       <p>{{ product.description }}</p>
  //     </div>
  //   </div>
  //   <ng-template #loading>
  //     <p>Loading products...</p>
  //   </ng-template>
  // `,
})
export class ProductListComponent implements OnInit {
  private productsService = inject(ProductsService);

  /* en la FORMA 1 y FORMA 2 se está usando un getter para exponer el valor de "productsSignal" o el valor directo de "getProductsSnapshot" y no directamente el signal como tal (como en el caso de productsSignal) para evitar que products sea un Signal en la plantilla HTML y solo sea un array normal porque Angular no permite llamar funciones dentro de las plantillas HTML en structural directives (*ngFor, *ngIf, etc.), es decir, no se podría llamar a "products()" ya que Angular no permite llamar a funciones en esos casos */
  /* Entonces, Los Signals se llaman como funciones (signal()) en TypeScript, pero no en la plantilla HTML (sí se puede dependiendo del caso y/o situación). Pero, en Angular con Signals, la mejor práctica es exponerlos a la plantilla HTML a través de un getter. */

  /* FORMA 1: usando get con "productsSignal()" */
  // public get products(): ProductInterface[] {
  //   return this.productsService.productsSignal();
  // }

  /* FORMA 2: usando get con "getProductsSnapshot()" */
  public get products(): ProductInterface[] {
    return this.productsService.getProductsSnapshot();
  }

  /* FORMA 3: usando computed con "productsSignal()" para mantener la reactividad del Signal */
  // public products: Signal<ProductInterface[]> = computed(() =>
  //   this.productsService.productsSignal()
  // );

  /* FORMA 4 */
  // public products = this.productsService.productsSignal();

  constructor() {
    /* effect para registrar cada cambio en el signal */
    effect(() => {
      console.log('product-list.component - Products updated:', this.products);
    });
  }

  ngOnInit(): void {
    this.productsService.getAllProducts(); // Cargar productos solo si es necesario

    console.log(
      'product-list.component - getProductsSnapshot',
      this.productsService.getProductsSnapshot()
    );

    /* aquí vemos que nos está dando el signal como tal */
    console.log(
      'product-list.component - productsSignal (signal)',
      this.productsService.productsSignal
    );

    /* aquí vemos que nos está dando de frente un array entonces no es un signal como tal porque ya estamos pasando directo el valor desde el servicio */
    console.log(
      'product-list.component - productsSignal (valor)',
      this.productsService.productsSignal()
    );

    console.log('product-list.component - products', this.products);
    console.log(
      'product-list.component - productsSignal',
      this.productsService.productsSignal()
    );
  }
}
