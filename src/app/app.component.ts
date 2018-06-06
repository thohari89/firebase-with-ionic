import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import firebase from 'firebase'; // versi lama
import firebase from 'firebase/app'; //core harus diambil wajib
              import 'firebase/auth';
              import 'firebase/database';

import { FirebaseConfig } from './credentials';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    //Menginisialisasi firebase
    firebase.initializeApp(FirebaseConfig);
    //Cek apakah user sudah ter authentifikasi atau belum
    const unsubscribe = firebase.auth()
    .onAuthStateChanged(user => {
        if (!user) { // belum terauthtenfikasi
          this.rootPage = 'LoginPage'; // pakai petik krn belum di import diatas 
          unsubscribe();
        } else {
          this.rootPage = HomePage; // tdak pakai petik krn sudah di import diatas
          unsubscribe();
        }
    });
  }
}

