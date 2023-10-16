import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart.service';
import { CartItem, userOrders } from 'src/app/user-orders';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent implements OnInit {

  orders:userOrders[]=[]
 isLoading:boolean = false


  constructor(private _CartService:CartService){}


  ngOnInit(){

    this.isLoading = true

   if(localStorage.getItem('userId') != null){

    this._CartService.getUserOrders(localStorage.getItem('userId')).subscribe({
      next:(res)=>{
        
        this.orders = res
        console.log(this.orders);
        this.isLoading = false
      },
      error:(err)=>{console.log(err);
        this.isLoading = false
      }
    })


   }


  }

}
