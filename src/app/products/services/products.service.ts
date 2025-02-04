import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../shared/services/base-http.service';
import { environment } from '../../../environments/environment';
import { ProductInterface } from '../../shared/interfaces/product.interface';
import { Observable } from 'rxjs';

/* se comenta esto ya que en este caso no haremos que sea proveído en root de toda la aplicación porque solo se usará en la parte de products */
// @Injectable({
//   providedIn: 'root',
// })
@Injectable()
export class ProductsService extends BaseHttpService {
  private LIMIT = 5;
  private readonly baseApiUrl = environment.BASE_API_URL;

  public getAllProducts(page: number): Observable<ProductInterface[]> {
    return this.getBaseHttp<ProductInterface[]>(this.baseApiUrl, 'products', {
      params: {
        limit: page * this.LIMIT,
      },
    });
  }
}
