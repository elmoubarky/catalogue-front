import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../catalogue.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  //ajout du service catalogueService
  //injecter les routes
  constructor(private catService: CatalogueService, private router:Router) { }

  //declarer un attribut liste des categories
  categories;
  currentCategorie;

  ngOnInit() {

    //indiquer au chargement de l'application de charger la liste des categories
    this.catService.getAllCategories()
    .subscribe(data=>{
        //ajouter les donnees dans l attribut categories
        this.categories = data;
      },err=> {
        console.log(err);
    })

  }

  //creer la methode daffichage des produits en fonction des categories
  onGetProducts(cat){

    this.currentCategorie = cat;
    let url = cat._links.products.href;
    //on va naviguer vers une autre route
    //on utiliser le Base64Url
    this.router.navigateByUrl("/products/"+btoa(url));
  }

  
}
