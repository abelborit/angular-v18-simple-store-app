import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../shared/services/base-http.service';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProductInterface } from '../../shared/interfaces/product.interface';

/* se comenta esto ya que en este caso no haremos que sea proveído en root de toda la aplicación porque solo se usará en la parte de products */
// @Injectable({
//   providedIn: 'root',
// })
@Injectable()
export class ProductsService extends BaseHttpService {
  private readonly baseApiUrl = environment.BASE_API_URL;

  /* Para manejar mejor la lógica en este servicio y permitir que el componente utilice tanto la función como los datos almacenados directamente, se puede implementar un patrón basado en Subjects y BehaviorSubjects. Esto permite que el servicio actúe como una fuente única de datos y que los componentes puedan suscribirse a cambios o consultar datos ya cargados. */

  /**
   * BehaviorSubject para almacenar y emitir la lista de productos.
   *
   * Es privado para evitar manipulaciones externas.
   *
   * Un BehaviorSubject almacena el estado actual de los productos (productsSubject).
   */
  private productsSubject = new BehaviorSubject<ProductInterface[]>([]);

  /**
   * Observable público para que los componentes puedan suscribirse y recibir actualizaciones en tiempo real.
   */
  public products$ = this.productsSubject.asObservable();

  /**
   * Obtiene todos los productos desde la API y actualiza el BehaviorSubject.
   *
   * getAllProducts() verifica si ya hay productos cargados en el BehaviorSubject (mediante productsSubject.value).
   *
   * Si ya se han cargado productos previamente, no vuelve a hacer una nueva solicitud HTTP, lo que optimiza el rendimiento.
   */
  public getAllProducts(): void {
    /* Si ya hay datos cargados, no realiza una nueva petición */
    if (this.productsSubject.value.length > 0) {
      return;
    }

    this.getBaseHttp<ProductInterface[]>(this.baseApiUrl, 'products').subscribe(
      {
        next: (data) => {
          this.productsSubject.next(data); // Actualiza el BehaviorSubject con los nuevos datos
          console.log('Products loaded:', data);
        },
        error: (error) => {
          console.error('Error loading products:', error);
        },
      }
    );
  }

  /**
   * Obtiene la lista actual de productos directamente desde el BehaviorSubject.
   *
   * getProductsSnapshot() permite obtener los datos más recientes sin necesidad de suscribirse, útil para sincronizaciones instantáneas. Esto es útil si el componente necesita datos sincronizados inmediatamente.
   *
   * @returns Una lista de productos.
   */
  public getProductsSnapshot(): ProductInterface[] {
    return this.productsSubject.value; // Devuelve la última versión de los datos
  }
}

/*
- Ventajas del enfoque:

  - Centralización de Datos:
    El servicio administra los datos de productos y los expone mediante un único Observable.

  - Reactividad:
    Los componentes que usan el servicio siempre reciben los datos actualizados automáticamente cuando cambian.

  - Rendimiento:
    Solo realiza la petición HTTP cuando los datos no están cargados, evitando solicitudes innecesarias.

  - Flexibilidad:
    Permite tanto suscripciones reactivas como acceso directo a través de getProductsSnapshot().

  - Escalabilidad:
    Se puede agregar métodos adicionales en el servicio, como addProduct, updateProduct, etc., que también actualicen el BehaviorSubject.
*/
