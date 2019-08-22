import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../catalogue.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  users;
  mode='list';

  constructor(private catalogueService : CatalogueService) { }

  ngOnInit() {
    this.onGetAllusers();
  }

  onGetAllusers(){
    this.catalogueService.getAllUsers()
    .subscribe(data=>{
      this.users = data;

    }),
    err=>{
      console.log(err);
    }
  }

  onNewUser(){
    this.mode = 'new-user';
  }

  onSaveUser(data){
    console.log(data);
    let url = this.catalogueService.host2+"/register";
    this.catalogueService.postRessources(url, data).
    subscribe(data=>{
      
      this.mode='list';
      this.onGetAllusers();
    }),
    err=>{
      console.log(err);
    }
  }

  onDeleteUser(user){
    let c = confirm("Etes vous sur de vouloir supprimer ?");
    if(!c) return;
    this.catalogueService.deleteRessources(user._links.self.href).
    subscribe(data=>{
      this.onGetAllusers();
    }),
    err=>{
      console.log(err);
    }

  }

  onUpdateUser(data){
    this.catalogueService.putRessources(this.currentUsers._links.self.href, data).
    subscribe(data=>{
      this.mode='list';
      this.onGetAllusers();
    }),
    err=>{
      console.log(err);
    }
  }

  currentUsers;
  onEditUser(user){
    this.catalogueService.getRessources2(user._links.self.href).
    subscribe(data=>{
      this.currentUsers = data;
      this.mode='edit-user';
    }),
    err=>{
      console.log(err);
    }
  }

}
