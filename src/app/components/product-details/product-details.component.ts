import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/cart.service';
import { proDet, productDetails } from 'src/app/product-details';
import { ProductsApiService } from 'src/app/products-api.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  isLoading:boolean = false

 productDetails: any ;
 
path:string = ''

  constructor(private _ProductsApiService:ProductsApiService , private _ActivatedRoute: ActivatedRoute , private _CartService: CartService ,  private toastr: ToastrService){}

  showSuccess() {
    this.toastr.success('Product added to cart successfully');
  }

  addtoCartCall(id: any) {

    this.isLoading = true

    this._CartService.addToCart(id).subscribe({
      next: (res: any) => {
        console.log(res);
  
        this._CartService.cartItemsNo.next(res.numOfCartItems)
  
        console.log(res.numOfCartItems);
  
  
        this.isLoading = false
  
        this.showSuccess()
      },
      error: (err) => {
        console.log(err);

        this.isLoading = false
      },
  
      complete: () => {
        console.log('add to cart complete');
      }
  
    })
  
  }




  ngOnInit(){     


    this.isLoading = true

    this.path = this._ActivatedRoute.snapshot.params['productId']

   
    



    this._ProductsApiService.getProductDetails(this.path).subscribe({
      next:(res) =>{

        this.productDetails = res.data

        console.log(this.productDetails);

        this.isLoading = false
        
       
        
        
        
      },
      error:(err)=>{console.log(err);

        this.isLoading = false
      },
      complete:()=>{console.log('details complete');
      }
    })



             }


  

  
}
