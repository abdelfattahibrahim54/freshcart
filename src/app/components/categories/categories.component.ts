import { Component, OnInit } from '@angular/core';
import { CategoriesServiceService } from 'src/app/categories-service.service';
import { Category } from 'src/app/category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

categories : Category[] = []
subCategories:any[]=[]
subCatName:string =''
isLoading :boolean = false
showSub:boolean = false

  constructor(private _CategoriesServiceService:CategoriesServiceService){}



  getCatName() {
    
    console.log(this);
    
    
  }

  subCatCall(catId:any , event:MouseEvent){
    
    const clickedElement = event.target as HTMLElement;
    this.subCatName = clickedElement.id
    
    this.isLoading = true
    


    this._CategoriesServiceService. getSubCategories(catId).subscribe({
      next:(res)=>{console.log(res);
        this.subCategories = res.data
        this.isLoading = false
        this.showSub = true

      },
      error:(err)=>{console.log(err);

        this.isLoading = false
      }
    })
  }


  ngOnInit(){

    this.isLoading = true

    this._CategoriesServiceService.getAllCategories().subscribe({
      next:(res:any)=>{console.log(res.data);
        this.categories = res.data
        this.isLoading = false
      },
      error:(err)=>{console.log(err);
        this.isLoading = false
      }
    })

  }




}
