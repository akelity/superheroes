import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';

@Component({
  selector: 'app-superheroes',
  templateUrl: './superheroes.component.html',
  styleUrls: ['./superheroes.component.css']
})
export class superheroesComponent implements OnInit {
  superheroes:any;

  constructor(private firebaseService:FirebaseService) { }

  ngOnInit() {
    this.firebaseService.getsuperheroes().subscribe(superheroes => {
      this.superheroes = superheroes;
    });
  }

}
