import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../catalogue.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {

  categories;
  mode='list';

  constructor(private catalogueService : CatalogueService) { }

  ngOnInit() {
    this.onGetAllcategories();
  }

  onGetAllcategories(){
    this.catalogueService.getAllCategories()
    .subscribe(data=>{
      this.categories = data;

    }),
    err=>{
      console.log(err);
    }
  }

  onDeleteCat(cat){
    let c = confirm("Etes vous sur de vouloir supprimer ?");
    if(!c) return;
    this.catalogueService.deleteRessources(cat._links.self.href).
    subscribe(data=>{
      this.onGetAllcategories();
    }),
    err=>{
      console.log(err);
    }

  }

  onNewCat(){
    this.mode = 'new-cat';
  }

  onSaveCat(data){
    let url = this.catalogueService.host+"/categories";
    this.catalogueService.postRessources(url, data).
    subscribe(data=>{
      this.mode='list';
      this.onGetAllcategories();
    }),
    err=>{
      console.log(err);
    }
  }

  onUpdateCat(data){
    this.catalogueService.putRessources(this.currentCategorie._links.self.href, data).
    subscribe(data=>{
      this.mode='list';
      this.onGetAllcategories();
    }),
    err=>{
      console.log(err);
    }
  }

  currentCategorie;
  onEditCat(cat){
    this.catalogueService.getRessources(cat._links.self.href).
    subscribe(data=>{
      this.currentCategorie = data;
      this.mode='edit-cat';
    }),
    err=>{
      console.log(err);
    }
  }


}
