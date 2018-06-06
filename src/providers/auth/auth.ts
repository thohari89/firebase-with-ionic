//import { HttpClient } from '@angular/common/http'; // krn firebase adalah https
import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor() {
    console.log('Hello AuthProvider Provider');
  }

  //Function untuk Login User
  loginUser(email:string, password:string): Promise<any>{
    return firebase.auth()
    .signInWithEmailAndPassword(email, password);
  }

  //Function untuk signup user
  signUpUser(email:string, password:string): Promise<any>{
    return firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then(newUserCredential =>{
      //resolve
      firebase.database()
      .ref(`/userProfile/${newUserCredential.user.uid}/email`)
      .set(email)
    })
    .catch(error => {
      console.error(error);
      throw new Error(error);
      }
    )
  }

  //Function untuk reset password
  resetPassword(email: string): Promise<any>{
    return firebase.auth()
    .sendPasswordResetEmail(email);
  }

  //Funtion untuk logout user
  logoutUser():Promise<any>{
    const userId:string = firebase.auth().currentUser.uid;
    firebase.database().ref(`/userProfile/${userId}`).off();
    return firebase.auth().signOut();
    }
}
