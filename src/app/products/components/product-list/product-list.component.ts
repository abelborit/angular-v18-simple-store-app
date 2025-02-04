import { Component, inject } from '@angular/core';
import { ProductsStateService } from '../../services/products-state.service';
import { ProductsService } from '../../services/products.service';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  providers: [ProductsStateService, ProductsService], // se coloca aquí ya que estamos haciendo que este servicio sea usado solo para este componente, si se colocara como -- providedIn: 'root', -- entonces no haría falta colocar este "providers" ya que se podría usar en cualquier parte de la aplicación
  // template: `
  //   @if (productsState.state().status !== 'loading') {
  //     <div>
  //       @for (product of productsState.state().products; track product.id) {
  //         <app-product-card [productInfo]="product" />

  //         <div>
  //           <h3>{{ product.title }}</h3>
  //           <p>{{ product.description }}</p>
  //         </div>
  //       }
  //     </div>
  //   } @else {
  //     <div>
  //       <p>Loading products...</p>
  //     </div>
  //   }
  // `,
})
export class ProductListComponent {
  public productsState = inject(ProductsStateService);

  public handleChangePage() {
    const newPage = this.productsState.state().page + 1;
    this.productsState.changePage$.next(newPage);
  }

  constructor() {
    console.log('ProductsState:', this.productsState.state());
  }
}
