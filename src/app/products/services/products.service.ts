import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

/* se comenta esto ya que en este caso no haremos que sea proveído en root de toda la aplicación porque solo se usará en la parte de products */
// @Injectable({
//   providedIn: 'root',
// })
@Injectable()
export class ProductsService {
  constructor() {}

  private httpClient = inject(HttpClient);

  public getAllProducts() {
    return this.httpClient.get('https://fakestoreapi.com/products');
  }
}
