import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-edit-superhero',
  templateUrl: './edit-superhero.component.html',
  styleUrls: ['./edit-superhero.component.css']
})
export class EditsuperheroComponent implements OnInit {
  id;
  name;
  city;
  superpowers;
  image;

  constructor(
    private firebaseService:FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.firebaseService.getsuperheroDetails(this.id).subscribe(superhero => {
      this.name = superhero.name;
      this.city = superhero.city;
      this.superpowers = superhero.superpowers;
    });
  }

  onEditSubmit(){
    let superhero = {
        name: this.name,
        city: this.city,
        superpowers: this.superpowers,
    }

    this.firebaseService.updatesuperhero(this.id, superhero);

    this.router.navigate(['/superheroes']);
  }

}
