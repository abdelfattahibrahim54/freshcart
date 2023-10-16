import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private _AuthService: AuthService, private _CartService: CartService) {

    this.userName = localStorage.getItem('userName')


  }

  userName: any
  islogin: boolean = false
  wishCount: any 
  cartNo: number = 0


  logOutCall() {
    this._AuthService.logOut()
    this.cartNo = 0
    
  }

  ngOnInit(): void {


    
    
    this._CartService.getLoggedUserWishList().subscribe({
      next:(res)=>{console.log(res.data);
        
        this._CartService.wishListCount.next(res.data.length)

        this.wishCount = this._CartService.wishListCount.value
        
        console.log( this._CartService.wishListCount.value);

        

    

      },
      error:(err)=>{console.log(err);
      }
    })
    

    this._CartService.getLoggedCart().subscribe({
      next: (res) => {
        console.log(res.numOfCartItems);
        this.cartNo = res.numOfCartItems
      },
      error: (err) => {
        console.log(err);
        this.cartNo = 0
      }
    })

    this._CartService.wishListCount.subscribe((val)=>{this.wishCount = val})
    this._CartService.cartItemsNo.subscribe((val) => {


      this.cartNo = val
    })


    this._AuthService.isLogin.subscribe({
      next: (val) => {


        this.userName = localStorage.getItem('userName')


        this.islogin = val


      }
    })


  }




}
