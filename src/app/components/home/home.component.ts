import { Component, OnInit } from '@angular/core';
import {AngularFire} from 'angularfire2';
import {FlashMessagesService} from 'angular2-flash-messages';
import {FirebaseService} from '../../services/firebase.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  superheroes:any;

  constructor(
    public af:AngularFire,
    public flashMessage:FlashMessagesService,
    private firebaseService:FirebaseService
  ) { }


  ngOnInit() {

    this.af.auth.subscribe(auth => {
      if(auth) {
        this.getSuperheroes();
      }
    });


  }

  login(){
    this.af.auth.login();
  }

  getSuperheroes() {
    this.firebaseService.getsuperheroes().subscribe(superheroes => {
      let storageRef = firebase.storage().ref();
      superheroes.forEach(function(item, index) {
        storageRef.child(item.path).getDownloadURL().then((url) => {
          item.imageUrl = url;
        }).catch((error) => {
          console.log(error);
        });
      });
      this.superheroes = superheroes;
    });
  }
}
