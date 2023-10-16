import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';
import { cartProduct } from 'src/app/cart-product';
import { CartService } from 'src/app/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartProducts: cartProduct[] = []

  cartId:any

  totalPrice: number = 0

  numberOfCartItems: number = 0


  isLoading: boolean = true



  constructor(private _CartService: CartService, private toastr: ToastrService, private _AuthService: AuthService) {



  }





  clearCartCall() {
    this._CartService.clearCart().subscribe()
    this.cartProducts = []
    this.totalPrice = 0.00
    this._CartService.cartItemsNo.next(0)


    this.numberOfCartItems = 0












  }
  showSuccess() {
    this.toastr.success('Product added to cart successfully');

  }


  updateQTYCall(Id: any, count: number) {
    this.isLoading = true
    if (count > 0) {
      this._CartService.updateQTY(Id, count).subscribe({
        next: (res) => {
          console.log(res);
          this.numberOfCartItems = res.numOfCartItems
          this.cartProducts = res.data.products
          this.totalPrice = res.data.totalCartPrice
          this.isLoading = false
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false
        }
      })
    }
    else { this.deleteCall(Id) }
  }

  addtoCartCall(id: any, count: any) {

    this.isLoading = true

    this._CartService.addToCart(id).subscribe({
      next: (res: any) => {
        console.log(res);

        this._CartService.cartItemsNo.next(res.numOfCartItems)
        this.numberOfCartItems = res.numOfCartItems



        this.showSuccess()


        this.updateQTYCall(id, count)

        this.isLoading = false



      },
      error: (err) => {
        console.log(err);

        this.isLoading = false
      },

      complete: () => {

      }

    })


  }

  deleteCall(id: any) {

    this.isLoading = true
    this._CartService.deleteItem(id).subscribe({
      next: (res) => {
        console.log(res);

        this.cartProducts = res.data.products

        this.totalPrice = res.data.totalCartPrice



        this._CartService.cartItemsNo.next(res.numOfCartItems)
        this.numberOfCartItems = res.numOfCartItems

        this.isLoading = false

        this.toastr.error('Item removed successfuly', '', {
          timeOut: 3000,


        }






        );




      },
      error: (err) => {
        console.log(err);
        this.isLoading = false
      }

    })
  }




  ngOnInit() {

    




    if (this._AuthService.isLogin) {

      this._CartService.getLoggedCart().subscribe({
        next: (res) => {
          console.log(res);
          this.cartProducts = res.data.products
          this.totalPrice = res.data.totalCartPrice
          this.isLoading = false
          this.numberOfCartItems = res.numOfCartItems
          this.cartId = res.data._id






        },
        error: (err) => {
          console.log(err);
          console.log('errorrrr');
          this.isLoading = false

        }

      })
    }

    this._CartService.cartItemsNo.subscribe((val) => {


      this.numberOfCartItems = val
    })


  }



}
