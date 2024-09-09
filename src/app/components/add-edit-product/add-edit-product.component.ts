import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.css'
})
export class AddEditProductComponent implements OnInit{
 //ACA PUEDO PONER VARIABLES GLOBALES
  
  formProducto : FormGroup;
  id: number;
  operacion: String = 'Agregar';
 //Para que nos ayude a configurar el formulario
constructor( private fb: FormBuilder,
  private _productService: ProductService,private toastr: ToastrService, private aRouter: ActivatedRoute,private router: Router){
  
    this.formProducto = this.fb.group({

      name: ['',Validators.required],
      description: ['',Validators.required],
      price: [null,Validators.required],
      stock: [null,Validators.required]
  
    })

  //Para obtener el id -->
  this.id =  Number(aRouter.snapshot.paramMap.get('id'));
  //aRouter.snapshot.paramMap.get('id');
  //console.log( aRouter.snapshot.paramMap.get('id'));
  console.log(this.id);



  if(this.id!=0 && this.id != null && this.id>=1){
  

  }else{
    
  }

}

ngOnInit():void{

  if(this.id!=0 ){
  
    this.operacion = 'Editar'
    this.getProducto(this.id);
  }


 

}

getProducto(id: number){

  this._productService.getProducto(id).subscribe((data:Product)=>{
    this.formProducto.setValue({
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock

    })
  })

}
addProduct() {

      //Mandamos los valores del Form a product de La clase prductos y llenamos los valores
      //console.log(this.formProducto.valid);
      
    const producto: Product ={
        name: this.formProducto.value.name,
        description: this.formProducto.value.description,
        price: this.formProducto.value.price,
        stock: this.formProducto.value.stock
        
    }
    
    if(this.id!=0){

      this._productService.actualizar(this.id,producto ).subscribe(()=>{
      //window.location.href = 'http://localhost:4200/';
      
      this.toastr.info(`El Producto ${producto.name} se actualizó correctamente ` , `Proceso Exitoso`)
      this.router.navigate(['/']);

      })
      //Una manera de regresar a la pag principal
      
      
     

    }else{
      this._productService.saveProduct(producto).subscribe(()=>{
        this.toastr.success("Prodcuto Agregado Exitosamente,Registro Exitoso!!")
        this.router.navigate(['/']);
      })

      // Después de procesar los datos, reseteamos el formulario para vaciarlo
      this.formProducto.reset();
    }
      
      
      
  }



  
    

}

