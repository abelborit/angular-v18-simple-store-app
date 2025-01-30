import { Component, inject, OnInit } from '@angular/core';
import { ProductInterface } from '../../../shared/interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  providers: [ProductsService], // se coloca aquí ya que estamos haciendo que este servicio sea usado solo para este componente, si se colocara como -- providedIn: 'root', -- entonces no haría falta colocar este "providers" ya que se podría usar en cualquier parte de la aplicación
})
export class ProductListComponent implements OnInit {
  /* FORMA 1: híbrido que combina elementos reactivos y control directo sobre los datos */
  private productsService = inject(ProductsService);

  public products: ProductInterface[] = []; // Lista de productos

  ngOnInit(): void {
    /* Cargar los productos (solo realiza la petición si no están cargados) */
    this.productsService.getAllProducts();

    /* Reactividad: Suscribirse al Observable (al observable público del servicio) para obtener datos reactivos, los cambios en los productos se reflejan en la lista automáticamente */
    this.productsService.products$.subscribe({
      next: (data) => {
        this.products = data;
        console.log('Products received in component:', data);
      },
      error: (error) => {
        console.error('Error receiving products in component:', error);
      },
    });

    // this.logProductsSnapshot()
  }

  /**
   * Ejemplo de uso del snapshot.
   *
   * Si se necesita usar la lista de productos como está en un momento específico, se puede llamar a getProductsSnapshot() en cualquier momento sin preocuparnos por la suscripción.
   */
  // public logProductsSnapshot(): void {
  //   /* si se quiere usar el -- this.logProductsSnapshot() -- */
  //   //     setTimeout(() => {
  //   //   this.products = this.productsService.getProductsSnapshot();
  //   //   console.log('Snapshot of products:', this.products);
  //   // }, 1000); // Ajusta el tiempo si la API tarda más

  //   const snapshot = this.productsService.getProductsSnapshot();
  //   console.log('Snapshot of products:', snapshot);
  // }

  // /* lo anterior sería útil, por ejemplo, si se necesita tomar una "fotografía" de los productos en su estado actual para realizar alguna operación */
  // public filterProductsByName(searchTerm: string): ProductInterface[] {
  //   const snapshot = this.productsService.getProductsSnapshot();
  //   return snapshot.filter((product) =>
  //     product.title.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  // }

  /* ********************************************************************************************************* */

  /* FORMA 2: Usar directamente en la plantilla (Angular Async Pipe) */
  /* Observable de productos expuesto directamente a la vista */
  // public products$: Observable<ProductInterface[]>;

  // constructor(private productsService: ProductsService) {
  //   this.products$ = this.productsService.products$; // Vincula el Observable directamente
  // }

  // ngOnInit(): void {
  //   this.productsService.getAllProducts(); // Asegura la carga inicial
  // }

  /* ********************************************************************************************************* */

  /* FORMA 3: Usar los productos como referencia directa en el componente */
  /* Si se necesita manipular los datos (por ejemplo, filtrarlos o procesarlos), se puede asignar los productos directamente a una variable desde el BehaviorSubject del servicio. */
  // public products: ProductInterface[] = []; // Referencia directa a los productos

  // private productsService = inject(ProductsService);

  // ngOnInit(): void {
  //   /* Carga los productos en el servicio */
  //   this.productsService.getAllProducts();

  //   /* Accede al snapshot una vez que los datos estén cargados */
  //   setTimeout(() => {
  //     this.products = this.productsService.getProductsSnapshot();
  //     console.log('Snapshot of products:', this.products);
  //   }, 1000); // Ajusta el tiempo si la API tarda más
  // }
}
