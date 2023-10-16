import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {

  constructor(private _AuthService: AuthService, private _Router: Router, private _CartService: CartService , private _ActivatedRoute:ActivatedRoute) { }

  isLoading: boolean = false;
  Msg: string = ''
  Apierror: boolean = false
  Apisuccess: boolean = false
  shippingDetObj: object = {}
  cartId:any


  shippingAddress = new FormGroup({

    details: new FormControl('', [Validators.required]),

    phone: new FormControl('', [Validators.required, Validators.pattern(/^(?:\+2|002)?01[0-9]{9}$/)]),

    city: new FormControl('', [Validators.required]),

  })

  ngOnInit(): void {
   this.cartId=this._ActivatedRoute.snapshot.params['cartId']

  
   
   
  }

  redirectToStripe(url:string){
    location.href = url
  }

  payment(form: any) {

    this.isLoading = true



    if (this.shippingAddress.valid) {

      this.shippingDetObj = form.value


      this._CartService.onlinePayment(this.cartId , this.shippingDetObj).subscribe(

        {next:(res)=>{console.log(res);

          this.redirectToStripe(res.session.url)



        },
      
        error:(err)=>{console.log(err);
        }
      
      
      
      }



      )

      console.log(this.shippingDetObj);



    }


  }

}
