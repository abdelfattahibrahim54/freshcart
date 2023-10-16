import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { product } from './product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // body: object = { productId: "" }

  cartItemsNo = new BehaviorSubject<number>(0)

  userId = new BehaviorSubject<string>('')

  wishListCount = new BehaviorSubject<number>(0)

  wishIdArr:any[] = []

 




  constructor(private _HttpClient: HttpClient) {

  }

  addToCart(productId: any): Observable<any> {


    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/cart', { productId: productId },)
  }


  getLoggedCart(): Observable<any> {

    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/cart',)
  }


  clearCart() {

    return this._HttpClient.delete('https://ecommerce.routemisr.com/api/v1/cart',)
  }


  updateQTY(productId: any, productCount: number): Observable<any> {


    return this._HttpClient.put('https://ecommerce.routemisr.com/api/v1/cart/' + productId, { count: productCount },)
  }



  deleteItem(productId: any): Observable<any> {



    return this._HttpClient.delete('https://ecommerce.routemisr.com/api/v1/cart/' + productId,)


  }


  onlinePayment(cartId: any, shippingAdd: object): Observable<any> {



    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://freshcart-ecommerce-wheat.vercel.app`, { shippingAddress: shippingAdd })


  }

  addProductToWish(productId:any):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/wishlist' , {productId: productId})
  }


  getLoggedUserWishList():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/wishlist')

  }


  removeProductFromWish(productId:any):Observable<any>{
    return this._HttpClient.delete('https://ecommerce.routemisr.com/api/v1/wishlist/'+productId )
  }


  getUserOrders(userId:any):Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/orders/user/'+userId )
  }


}
