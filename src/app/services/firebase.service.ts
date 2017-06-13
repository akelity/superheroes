import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {
  superheroes: FirebaseListObservable<any[]>;
  superhero: FirebaseObjectObservable<any>;
  folder: any;

  constructor(private af: AngularFire) {
    this.folder = 'superheroimages';
    this.superheroes = this.af.database.list('/superheroes') as FirebaseListObservable<superhero[]>
  }

  getsuperheroes(){
    return this.superheroes;
  }

  getsuperheroDetails(id){
    this.superhero = this.af.database.object('/superheroes/'+id) as FirebaseObjectObservable<superhero>
    return this.superhero;
  }

  addsuperhero(superhero){

    let storageRef = firebase.storage().ref();

    for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]){
      let path = `/${this.folder}/${selectedFile.name}`;
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        superhero.image = selectedFile.name;
        superhero.path = path;
        superhero.pathThumb = `/${this.folder}/thumb_${selectedFile.name}`;
        return this.superheroes.push(superhero);
      });
    }
  }

  updatesuperhero(id, superhero){
    return this.superheroes.update(id, superhero);
  }

  deletesuperhero(id){
    return this.superheroes.remove(id);
  }

}

interface superhero{
  $key?:string;
  name?:string;
  city?:string;
  superpowers?:string;
  image?:string;
}