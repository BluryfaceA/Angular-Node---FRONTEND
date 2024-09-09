import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { log } from 'console';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent implements OnInit{

listProducts: Product[] = [
  //{id:1,name:"Cola-Cola", description: "Generador de Piedras",price:2.50,stock: 100},
  //{id:2,name:"ASD", description: "ASD ASD ASD",price:0,stock: 10},
  
]


constructor(private _productService: ProductService,private toastr: ToastrService){}

ngOnInit():void{
this.getProductos();
}

getProductos(){
this._productService.getProductos().subscribe((data: Product[])=>{
  this.listProducts= data;
})
}

deleteProduct(id:number){
  
   this._productService.delete(4).subscribe((data)=>{
    this.toastr.warning("Producto Eliminado con Éxito","Eliminado!!");
    this.getProductos();
})  
 
}





}
