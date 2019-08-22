import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { AuthentificationService } from './authentification.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  //definition d une variable de type host
  public host: String = "http://localhost:8086";
  public host2: String = "http://localhost:8080";

//injecter le service http de type HttpClient
  constructor(private http:HttpClient, private authService : AuthentificationService ) { }

  //creation d'une methode permettant d'afficher toutes les categories
getAllCategories(){
  return this.http.get(this.host+"/categories");
}

//creation d'une methode permettant d'afficher touts les produits
getAllProducts(){
  return this.http.get(this.host+"/products");
}

//creation d'une methode permettant d'afficher touts les users
getAllUsers(){
  let headers = new HttpHeaders({'authorization': 'Bearer '+ this.authService.jwt});
  return this.http.get(this.host2+"/appUsers", {headers : headers});
}

//methode pour retourner la ressources en fonction de l'url
//elle sera utilise pour envoye  des requetes avec get
getRessources(url){
return this.http.get(url);
}

getRessources2(url){
  let headers = new HttpHeaders({'authorization': 'Bearer '+ this.authService.jwt});
  return this.http.get(url, {headers : headers});
  }

//methode pour supprimer la ressources en fonction de l'url
//elle sera utilise pour envoye  des requetes avec delete
deleteRessources(url){
  let headers = new HttpHeaders({'authorization': 'Bearer '+ this.authService.jwt});
  return this.http.delete(url, {headers : headers});
  }

  //methode pour ajouter la ressources en fonction de l'url
//elle sera utilise pour envoye  des requetes avec post
postRessources(url, data){
  let headers = new HttpHeaders({'authorization': 'Bearer '+ this.authService.jwt});
  return this.http.post(url,data, {headers : headers});
  }

  //methode pour modifier la ressources en fonction de l'url
//elle sera utilise pour envoye  des requetes avec put
putRessources(url, data){
  let headers = new HttpHeaders({'authorization': 'Bearer '+ this.authService.jwt});
  return this.http.put(url,data, {headers : headers});
  }

  //methode pour modifier la ressources en fonction de l'url
//elle sera utilise pour envoye  des requetes avec patch
patchRessources(url, data){
  let headers = new HttpHeaders({'authorization': 'Bearer '+ this.authService.jwt});
  return this.http.patch(url,data, {headers : headers});
  }

}
