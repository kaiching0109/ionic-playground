import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  isLoading = false;
  isLogin = true;

  constructor(private loadingCtl: LoadingController,private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }


  onLogin(){
    this.authService.login();
    this.isLoading = true;
    this.loadingCtl.create({keyboardClose: true, message: 'Logging in....'})
      .then(loadingEl => {
        loadingEl.present();
        setTimeout(() => {
          this.isLoading = false;
          loadingEl.dismiss();
          this.router.navigateByUrl('/places/tabs/discover');
        }, 1500)
      });
  }

  onSubmit(form: NgForm) {
    if(!form.valid) return 
    else {
      const {email, password} = form.value;

      if(this.isLogin) {
        //Login
      } else {
        //Signup
      }
    }
  }

  onSwithcAuthMode() {
    this.isLogin = !this.isLogin;
  }

}
