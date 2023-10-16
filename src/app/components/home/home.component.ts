import { Component, OnInit } from '@angular/core';
import { ProductsApiService } from 'src/app/products-api.service';
import { product } from 'src/app/product';
import { categories } from 'src/app/categories';
import { CartService } from 'src/app/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistComponent } from '../wishlist/wishlist.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit  {

  // productList: product[] = []
  // searchingWord: string = ''
  categoriesArr: categories[] = []

  // wishListIdArr:[] = []

  // wishIdArr:any[] = []
  // wishId:string = '1'
  

  constructor(private _ProductsApiService: ProductsApiService, private _CartService: CartService, private toastr: ToastrService) { ;
   }



  // showSuccess() {
  //   this.toastr.success('Product added to cart successfully');
  // }

  // showSuccessWish() {
  //   this.toastr.success('Product added to wish list successfully');
  // }


  // addtoCartCall(id: any) {

  //   this._CartService.addToCart(id).subscribe({
  //     next: (res: any) => {
  //       console.log(res);

  //       this._CartService.cartItemsNo.next(res.numOfCartItems)

  //       console.log(res.numOfCartItems);


  //       this.showSuccess()
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },

  //     complete: () => {
  //       console.log('add to cart complete');
  //     }

  //   })

  // }


  // addToWishCall(_Id:any){
  //   this._CartService.addProductToWish(_Id).subscribe({next:(res)=>{console.log(res.data);

  //     this._CartService.wishListCount.next(res.data.length)
  //     this.wishListIdArr = res.data

      
      

  //     this.wishId = res.data.toString()
      
  //     console.log(this.wishId);
      

  //     this.showSuccessWish()


  //   }
    




    
    
    
  //   ,
  //   error:(err)=>{console.log(err);
  //   }
  // })
  // }





  // removeCall(id:any){

    
  
  //   this._CartService. removeProductFromWish(id).subscribe((val)=>{console.log(val);
  
  
  //     this._CartService.getLoggedUserWishList().subscribe({
  //       next:(res)=>{console.log(res.data);
  
  //         // this.wishListArr = res.data
  
          
  
  
  //         this._CartService.wishListCount.next(res.data.length)
  
  
  
  
  
  //       },
  //       error:(err)=>{console.log(err);
  //       }
  //     })
  
     
  //     this.toastr.error('Item removed successfuly', '', {
  //       timeOut: 3000,
  //     });
  
     
  
  //   })
  //  }












  ngOnInit(): void {

    // this.wishId = this._CartService.wishIdArr.toString()


    // this._ProductsApiService.getAllProducts().subscribe(
    //   {
    //     next: (res) => {
    //       this.productList = res.data;




    //     },
    //     error: (err) => {
    //       console.log(err);
    //     },
    //     complete: () => {


    //     },
    //   },


    // );

    this._ProductsApiService.getCategories().subscribe({
      next: (res) => {
        this.categoriesArr = res.data

        console.log(this.categoriesArr);


      },

      error: (err) => {
        console.log(err);

      },

      complete: () => {
        console.log('categories complete');
      }
    })





    // this._CartService.getLoggedUserWishList().subscribe({
    //   next:(res)=>{


    //     res.data.forEach((element: any) => {

    //      this._CartService.wishIdArr.push(element._id)
        
          
    //     });

    //     this.wishId = this._CartService.wishIdArr.toString()
        
    //     console.log(this.wishId);


    //     // this.wishListArr = res.data

  




    //   },
    //   error:(err)=>{console.log(err);
    //   }
    // })










  }

}
