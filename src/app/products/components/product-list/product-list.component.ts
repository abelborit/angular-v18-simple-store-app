import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ProductInterface } from '../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  providers: [ProductsService], // se coloca aquí ya que estamos haciendo que este servicio sea usado solo para este componente, si se colocara como -- providedIn: 'root', -- entonces no haría falta colocar este "providers" ya que se podría usar en cualquier parte de la aplicación
})
export class ProductListComponent implements OnInit {
  private productsService = inject(ProductsService);

  public products: ProductInterface[] = [];

  // constructor() {
  //   this.productsService.getAllProducts().subscribe((products) => {
  //     console.log(products);
  //     return;
  //   });
  // }

  ngOnInit(): void {
    this.getAllProducts();
  }

  private getAllProducts(): void {
    this.productsService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data; // Procesa los productos obtenidos
        console.log('Products loaded:', data);
      },
      error: (err) => {
        console.error('Error loading products:', err);
      },
    });
  }
}
