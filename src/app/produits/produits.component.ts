import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../catalogue.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  //declaration d'un attribut qui va recuperer les produits
  products;

  //utilisation du service et de la route permettant d utiliser la route qui est active
  constructor(private catalogueService: CatalogueService,
     private route: ActivatedRoute, private router: Router) {

      router.events.subscribe(event=>{
        if(event instanceof NavigationEnd){
          //verifier si l url change
        //recuperer l'url en decodant
        let url = atob(route.snapshot.params.urlProds);
        
        this.getProducts(url);
        }
      })
    
   }

  ngOnInit() {
  }

  //creation du methode qui prendra en parametre l'url 
  getProducts(url){

    //utilisation du service pour recuperer
    this.catalogueService.getRessources(url)
    .subscribe(data=>{
      this.products = data;
    }, err=> {
      console.log(err);
  })

  }

}
