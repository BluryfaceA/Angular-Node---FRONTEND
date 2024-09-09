import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private  myAppUrl: string;
  private myApiUrl: String;
  

  constructor(private http:HttpClient) { 
    //Almacenamos el link
    this.myAppUrl=environment.endpoint;
    this.myApiUrl = 'api/productos/';
  }

  //Obtener Productos
  getProductos():Observable<Product[]>{
    return this.http.get<Product[]>(this.myAppUrl + this.myApiUrl);
  }

  //Eliminar
  delete(id: number):Observable<void>{

   return this.http.delete<void>(this.myAppUrl + this.myApiUrl + id);
   

  }

  //Para agregar un Producto
  saveProduct(product: Product): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,product);
    
  }


  getProducto(id: number): Observable<Product>{
    return this.http.get<Product>(this.myAppUrl + this.myApiUrl + id);
  }

  //Actualizar
  actualizar(id: number,product: Product): Observable<void>{
    return this.http.put<void>(this.myAppUrl + this.myApiUrl + id, product);
  }
  


}
