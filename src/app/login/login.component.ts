import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthentificationService, private router : Router) { }

  ngOnInit() {
  }

  onLogin(data){
    //appel du service
    this.authService.login(data)
    .subscribe(resp=>{
     //recuperer le jwt
      let jwt = resp.headers.get('Authorization');

      //appel de la methode pour saveToken du service
      this.authService.saveToken(jwt);
      //utiliser la route pour enlever le formulaire d authentif
      this.router.navigateByUrl("/");
    }, err=>{
      
    })
  }

  

}
