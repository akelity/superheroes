import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-superhero',
  templateUrl: './add-superhero.component.html',
  styleUrls: ['./add-superhero.component.css']
})
export class AddsuperheroComponent implements OnInit {
  name:any;
  city:any;
  superpowers:any;
  image:any;

  constructor(
    private firebaseService:FirebaseService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  onAddSubmit(){
    let superhero = {
      name: this.name,
      city: this.city,
      superpowers: this.superpowers,
    }

    this.firebaseService.addsuperhero(superhero);

    this.router.navigate(['superheroes']);
  }

}
