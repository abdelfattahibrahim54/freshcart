import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { authGuardGuard } from './auth-guard.guard';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ForgetPWComponent } from './components/forget-pw/forget-pw.component';

const routes: Routes = [
  {path:'',redirectTo:'login' , pathMatch:'full'},
  {path:'home',component:HomeComponent , canActivate:[authGuardGuard]},
  {path:'brands',component:BrandsComponent , canActivate:[authGuardGuard]},
  {path:'cart',component:CartComponent , canActivate:[authGuardGuard]},
  {path:'categories',component:CategoriesComponent , canActivate:[authGuardGuard]},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'products',component:ProductsComponent , canActivate:[authGuardGuard]},
  {path:'checkout/:cartId',component:CheckOutComponent , canActivate:[authGuardGuard]},
  {path:'allorders',component:AllOrdersComponent , canActivate:[authGuardGuard]},
  {path:'wishlist',component:WishlistComponent , canActivate:[authGuardGuard]},
  {path:'forgetpw',component:ForgetPWComponent },
  {path:'productDetails/:productId',component:ProductDetailsComponent , canActivate:[authGuardGuard]},

{path:'settings',




loadChildren:()=> import('./settings/settings.module').then((m)=>m.SettingsModule),




canActivate:[authGuardGuard]

},

  {path:'**',component:NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
