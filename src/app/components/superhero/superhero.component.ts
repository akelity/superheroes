import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-superhero',
  templateUrl: './superhero.component.html',
  styleUrls: ['./superhero.component.css']
})
export class superheroComponent implements OnInit {
  id:any;
  superhero: any;
  imageUrl:any;

  constructor(
    private firebaseService: FirebaseService,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.firebaseService.getsuperheroDetails(this.id).subscribe(superhero => {
      this.superhero = superhero;

      let storageRef = firebase.storage().ref();
      storageRef.child(this.superhero.path).getDownloadURL().then((url) => {
        this.imageUrl = url;
      }).catch((error) => {
        console.log(error);
      });

    });
  }

  onDeleteClick(){
    this.firebaseService.deletesuperhero(this.id);
    this.router.navigate(['/superheroes']);
  }

}
