import { Component, OnInit } from '@angular/core';
import { BrandsService } from 'src/app/brands.service';
import { Category } from 'src/app/category';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  brands:Category[]=[]
  constructor(private _BrandsService:BrandsService){}



brandImage:any
brandName:any
brandId:any

isLoading:boolean = false
isLoading2:boolean = false


getSpBrandCall(id:any ){

this.isLoading = true
  
  


  this._BrandsService.getSpecificBrand(id).subscribe({
    next:(res)=>{console.log(res);




      this.brandImage = res.data.image
      this.brandName = res.data.name

      this.isLoading = false


    },
    error:(err)=>{console.log(err);
      this.isLoading = false
    }
  })
}



ngOnInit(): void {
  
  this.isLoading2 = true

  this._BrandsService.getAllBrands().subscribe({
    next:(res)=>{console.log(res.data);

      this.brands=res.data
      this.isLoading2 = false
    },
    error:(err)=>{console.log(err);
      this.isLoading2 = false
    }
  })

}


}
