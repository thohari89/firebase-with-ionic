//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase, { User } from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
//import { User, AuthCredential} from '@firebase/auth-types';
//import { Reference } from '@firebase/database';

@Injectable()
export class ProfileProvider {
  //global variabel 

  public userProfile: firebase.database.Reference;
  public currentUser: User;

  constructor() {
    console.log('Hello ProfileProvider Provider');
    // cek firebase
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        this.userProfile = firebase.database().ref(`/userProfile/${user.uid}`);
      }
    });
  }

  //untuk mengambil semua user profile
  getUserProfile(): firebase.database.Reference {
    return this.userProfile;
  }
}
