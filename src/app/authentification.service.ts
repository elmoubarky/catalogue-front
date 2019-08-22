import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  
  
  host2: string = "http://localhost:8080"
  jwt:string;
  username:string;
  roles:Array<string>;

  constructor(private http: HttpClient) { }

  login(data){
    //recuperer mla reponse sans convertir en json
    return this.http.post(this.host2+"/login", data, {observe:'response'});
  }

  logOut() {
    localStorage.removeItem('token');
    this.initParams();
  }

  //initialiser les parametres
  initParams(){
    this.jwt = undefined;
    this.username = undefined;
    this.roles = undefined;
  }

  saveToken(jwt: string){

    localStorage.setItem('token',jwt);
    this.jwt= jwt;
    //appel d'une methode pour recuperer le username et roles
    this.parseJWT();

  }

  parseJWT(){
    //on utilisera une librairie pour parser le jwt et recupere le username et les roles
    let jwtHelper = new JwtHelperService();
    let jwtObject = jwtHelper.decodeToken(this.jwt);
    this.username = jwtObject.sub;
    this.roles = jwtObject.roles;
  }

  //methode pour verifier si c'est un admin ou pas 
  isAdmin(){
    return this.roles.indexOf('ADMIN')>=0;
  }

  //methode pour verifier si c'est un user ou pas 
  isUser(){
    return this.roles.indexOf('USER')>=0;
  }

  //verifier sil est authentifier
  isAuthenticated(){
    return this.roles && (this.isAdmin() || this.isUser());
  }

  //permet de charger le token
  loadToken() {
    this.jwt = localStorage.getItem('token'); 
    this.parseJWT();
  }
}
