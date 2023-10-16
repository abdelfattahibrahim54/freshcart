import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-forget-pw',
  templateUrl: './forget-pw.component.html',
  styleUrls: ['./forget-pw.component.scss']
})
export class ForgetPWComponent {

  isLoading: boolean = false
  disabled: boolean = false
  error: boolean = false
  error2: boolean = false
  success: boolean = false
  success2: boolean = false
  showCode: boolean = false
  errorMsg: string = ''
  errorMsg2: string = ''

  resetBody: object = {

  }




  constructor(private _AuthService: AuthService , private _Router:Router) {
    console.log(this.forgetPWEmail.valid);

  }


  forgetPWEmail = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })


  resetCodeForm = new FormGroup({

    resetCode: new FormControl('', [Validators.required])

  })

  newPasswordForm = new FormGroup({
    newPassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/), Validators.minLength(8)])
  })

  showCodeSec() {
    this.showCode = true
  }



  submitFN(form: any) {

    console.log(form);

    this.isLoading = true

    if (form.status == "VALID") {

      console.log(form.value);


      this._AuthService.forgetPW(form.value).subscribe({
        next: (res) => {
          console.log(res);


          this.isLoading = false
          this.disabled = true
          this.success = true
          localStorage.setItem('email', form.value.email)












        },
        error: (err) => {
          console.log(err);

          this.error = true
          this.errorMsg = err.error.message

          this.isLoading = false



        }
      })
    }

  }


  submitFN2(form: any) {

    console.log(form);

    this.isLoading = true

    if (form.status == "VALID") {

      console.log(form.value);


      this._AuthService.verifyCode(form.value).subscribe({
        next: (res) => {
          console.log(res);


          this.isLoading = false

          this.success2 = true





        },
        error: (err) => {
          console.log(err);

          this.error2 = true
          this.errorMsg = err.error.message

          this.isLoading = false



        }
      })
    }

  }


  submitFN3(form: any) {

    console.log(form);

    this.isLoading = true

    if (form.status == "VALID") {

      console.log(form.value);

      this.resetBody = {
        email: localStorage.getItem('email'),
        newPassword: form.value.newPassword
      }

      console.log(this.resetBody);





      this._AuthService.resetPassword(this.resetBody).subscribe({
        next: (res:any) => {
          console.log(res);



          this.isLoading = false

          localStorage.setItem('token',res.token)
          localStorage.removeItem('email')
          this._AuthService.isLogin.next(true)
          this._Router.navigate(['/login'])

          


        },
        error: (err) => {
          console.log(err);

          this.error2 = true
          this.errorMsg = err.error.message

          this.isLoading = false


          localStorage.removeItem('email')

        }
      })
    }

  }




}
