import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/cart.service';
import { wishListProduct } from 'src/app/product';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  isLoading: boolean = false
  
  wishIdArr: any[] = []
  wishListArr: any[] = []

  constructor(private _CartService: CartService, private toastr: ToastrService) { }

  showSuccess() {
    this.toastr.success('Product added to cart successfully');
  }


  addtoCartCall(id: any) {

    this.isLoading = true

    this._CartService.addToCart(id).subscribe({
      next: (res: any) => {
        console.log(res);

        this.removeCall(id)


        this._CartService.cartItemsNo.next(res.numOfCartItems)

        console.log(res.numOfCartItems);


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



  removeCall(id: any) {

    this.isLoading = true

    this._CartService.removeProductFromWish(id).subscribe((res) => {


      console.log(res.data);


      this._CartService.getLoggedUserWishList().subscribe({
        next: (res) => {
          this.wishListArr = res.data
        },
        error: (err) => {
          console.log(err);
        }
      })

      this._CartService.wishListCount.next(res.data.length)
      
      res.data.forEach((element: any) => {
        
        this.wishIdArr.push(element._id)
        
      });



      this._CartService.wishIdArr = this.wishIdArr

    

      this.toastr.error('item removed from wishlist', '', {
        timeOut: 3000,
      });


      this.isLoading = false

    })
  }

  ngOnInit() {




    this.isLoading = true

    this._CartService.getLoggedUserWishList().subscribe({
      next: (res) => {
        // console.log(res.data);


        this.wishListArr = res.data

        if(res.data.length != 0){
          
        }

        this.isLoading = false




      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
