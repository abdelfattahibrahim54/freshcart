import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { AuthService } from 'src/app/auth.service';
import { CartService } from 'src/app/cart.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {




  constructor(private _AuthService: AuthService, private _Router: Router , private _CartService:CartService) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') != ''){
      this._Router.navigate(['/home'])
    }
  }

  loginError: boolean = false;
  loginSuc: boolean = false;

  userData: any
  loginMsg: string = '';
  isLoading: boolean = false
  loginForm = new FormGroup({

    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/), Validators.minLength(8)])

  })




  submitFunction(form: any) {

    this.isLoading = true
    console.log(form.value);


    if (form.valid) {

      this._AuthService.login(form.value).subscribe({
        next: (response: any) => {
          console.log(response.token);

          this.loginSuc = true;
          this.loginMsg = 'Login successful !'
          this.isLoading = false

          this._Router.navigate(['home'])

          this.userData = jwtDecode(response.token)

          // this._CartService.userId.next(response)
          

          localStorage.setItem('userId', this.userData.id)
          localStorage.setItem('token', response.token)
          localStorage.setItem('userName', this.userData.name)
          
          this._AuthService.isLogin.next(true)


          this._CartService.getLoggedCart().subscribe({
            next: (res) => {
              console.log(res.numOfCartItems);
              this._CartService.cartItemsNo.next(res.numOfCartItems) 
            },
            error: (err) => {
              console.log(err);
              
            }
          })
          




        },
        error: (err) => {
          console.log(err);

          this.loginError = true

          this.loginMsg = err.error.message

          this.isLoading = false
        },
        complete: () => { }
      })


    }





  }



















}


