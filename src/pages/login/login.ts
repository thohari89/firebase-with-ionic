import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Alert, AlertController, Loading, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../../pages/home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  // global variable
  public loading: Loading;
  public loginForm: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public formBuilder: FormBuilder) {

    // perintah untuk validasi form
    this.loginForm = formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required])
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  // fungsi untuk proses login user
  loginUser() {
    // cek email dan password sudah valid atau belum
    if (!this.loginForm.valid) { // belum valid
      console.log(`Form belum valid: ${this.loginForm.value}`);
    } else {    // sudah valid
      // baca formControlName dahulu
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      // cek firebase dari AuthProvider
      this.authProvider.loginUser(email, password)
        .then(    // resolve
          authData => {
            this.loading.dismiss().then(() => {
              this.navCtrl.setRoot(HomePage);
            });
          },      // reject
          error => {
            this.loading.dismiss().then(() => {
              const myAlert: Alert = this.alertCtrl.create({
                message: error.message,
                buttons: [{ text: 'OK', role: 'cancel' }]
              });
              myAlert.present();
            });
          }
        );
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

  //untuk buka layout signup
  goToSignup(): void {
    this.navCtrl.push('SignupPage');
  }
  //untuk buka layout reset password
  goToResetPassword(): void {
    this.navCtrl.push('ResetPasswordPage');
  }

  ionViewDidLoad() {// function yg pasti dijalankan ketika layout ini djalankan
    console.log('ionViewDidLoad LoginPage');
  }
}
