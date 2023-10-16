import { Component } from '@angular/core';
import { FormControl, FormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

constructor(private _AuthService:AuthService , private _Router:Router){}

isLoading:boolean = false ;
Msg:string = ''
Apierror:boolean = false
Apisuccess:boolean = false


registerForm = new FormGroup ({

name: new FormControl('',[Validators.required, Validators.minLength(3) ,Validators.maxLength(20), Validators.pattern(/^[A-Z][a-zA-Z]+$/)]),
email: new FormControl('',[Validators.required , Validators.email]),
password: new FormControl('',[Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
rePassword: new FormControl('',Validators.required),
phone: new FormControl('',[Validators.required , Validators.pattern(/^(?:\+2|002)?01[0-9]{9}$/)]),
})

register(form:any){

  this.isLoading = true

  console.log(form.value);

if (this.registerForm.valid && this.registerForm.controls['password'].value === this.registerForm.controls['rePassword'].value){

  
  this._AuthService.signUp(form.value).subscribe({
    next:(res)=>{console.log(res);
    
    
      this.isLoading = false
      this.Apisuccess = true
      this.Msg = "Registration successful !"


      this._Router.navigate(['/login'])

    
      
    },

    error:(err)=>{console.log(err);

      this.isLoading = false
      this.Msg = err.error.message
      this.Apierror = true
    },

    complete:()=> {
      console.log('complete');
      
    },
  })
  
  
}
  
  
}
}
