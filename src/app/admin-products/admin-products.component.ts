import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../catalogue.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  products;
  mode='list';

  constructor(private catalogueService : CatalogueService) { }

  ngOnInit() {
    this.onGetAllproducts();
  }

  onGetAllproducts(){
    this.catalogueService.getAllProducts()
    .subscribe(data=>{
      this.products = data;

    }),
    err=>{
      console.log(err);
    }
  }

  onNewProd(){
    this.mode = 'new-prod';
  }

  onSaveProd(data){
    let url = this.catalogueService.host+"/products";
    this.catalogueService.postRessources(url, data).
    subscribe(data=>{
      this.mode='list';
      this.onGetAllproducts();
    }),
    err=>{
      console.log(err);
    }
  }

  onDeleteProd(prod){
    let c = confirm("Etes vous sur de vouloir supprimer ?");
    if(!c) return;
    this.catalogueService.deleteRessources(prod._links.self.href).
    subscribe(data=>{
      this.onGetAllproducts();
    }),
    err=>{
      console.log(err);
    }

  }

  
  onUpdateProd(data){
    this.catalogueService.putRessources(this.currentProducts._links.self.href, data).
    subscribe(data=>{
      this.mode='list';
      this.onGetAllproducts();
    }),
    err=>{
      console.log(err);
    }
  }

  currentProducts;
  onEditProd(prod){
    this.catalogueService.getRessources(prod._links.self.href).
    subscribe(data=>{
      this.currentProducts = data;
      this.mode='edit-prod';
    }),
    err=>{
      console.log(err);
    }
  }

}
