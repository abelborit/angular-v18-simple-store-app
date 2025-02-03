import {
  Injectable,
  signal,
  effect,
  WritableSignal,
  // computed,
  // Signal,
} from '@angular/core';
import { BaseHttpService } from '../../shared/services/base-http.service';
import { environment } from '../../../environments/environment';
import { ProductInterface } from '../../shared/interfaces/product.interface';

/* se comenta esto ya que en este caso no haremos que sea proveído en root de toda la aplicación porque solo se usará en la parte de products */
// @Injectable({
//   providedIn: 'root',
// })
@Injectable()
export class ProductsService extends BaseHttpService {
  private readonly baseApiUrl = environment.BASE_API_URL;

  /**
   * `products` es un Signal que almacena la lista de productos.
   */
  private products: WritableSignal<ProductInterface[]> = signal<
    ProductInterface[]
  >([]);

  constructor() {
    super();
    /* Efecto opcional para depuración: se ejecuta cada vez que `products` cambia */
    effect(() =>
      console.log('products.service - Products updated:', this.products())
    );
  }

  /**
   * Obtiene la lista de productos desde la API y actualiza el Signal.
   */
  public getAllProducts(): void {
    if (this.products().length > 0) return; // Evita llamadas innecesarias

    this.getBaseHttp<ProductInterface[]>(this.baseApiUrl, 'products').subscribe(
      {
        next: (data) => {
          this.products.set(data); // Actualiza el Signal con los nuevos datos
          console.log('products.service - Products loaded:', data);
        },
        error: (error) => {
          console.error('products.service - Error loading products:', error);
        },
      }
    );
  }

  /* FORMA 1: retornando ya la respuesta del signal */
  /**
   * Permite acceder a la lista actual de productos sin suscribirse.
   * Los componentes pueden llamarlo directamente en su template o lógica.
   */
  public getProductsSnapshot(): ProductInterface[] {
    return this.products();
  }

  /* FORMA 2: aquí se está retornando el valor del signal */
  public get productsSignal(): WritableSignal<ProductInterface[]> {
    return this.products;
  }

  /* FORMA 3: usando un get y forzando a que retorne un signal */
  // public get productsSignal(): Signal<ProductInterface[]> {
  //   return computed(() => this.products());
  // }

  /* FORMA 4: forzando a que retorne un signal */
  // public productsSignal(): Signal<ProductInterface[]> {
  //   return computed(() => this.products());
  // }

  /* FORMA 5: forzando a que retorne un signal */
  // public productsSignal: Signal<ProductInterface[]> = computed(() =>
  //   this.products()
  // );
}

/*
- Ventajas del Enfoque con Signals:

  - Menos código y más rendimiento:
    No hay necesidad de BehaviorSubject ni Observable.

  - Reactivo por naturaleza:
    No requiere suscripción manual en los componentes.

  - Más limpio y eficiente:
    products() devuelve siempre el valor más reciente.

  - Optimizado para Angular 16+:
    Signals están diseñados específicamente para mejorar el rendimiento en Angular.
*/
