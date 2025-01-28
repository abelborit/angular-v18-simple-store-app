import { Component, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  providers: [ProductsService], // se coloca aquí ya que estamos haciendo que este servicio sea usado solo para este componente, si se colocara como -- providedIn: 'root', -- entonces no haría falta colocar este "providers" ya que se podría usar en cualquier parte de la aplicación
})
export class ProductListComponent {
  public productsService = inject(ProductsService);

  constructor() {
    this.productsService.getAllProducts().subscribe((products) => {
      console.log(products);
      return;
    });
  }
}
