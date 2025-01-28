import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../shared/services/base-http.service';
import { Observable } from 'rxjs';
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
   * Obtiene todos los productos desde la API.
   * Utiliza el método `get` de BaseHttpService para mayor robustez.
   * @returns Un Observable con la lista de productos.
   */
  public getAllProducts(): Observable<ProductInterface[]> {
    return this.getBaseHttp(this.baseApiUrl, 'products'); // Usa el método genérico 'get' de BaseHttpService
  }
}
