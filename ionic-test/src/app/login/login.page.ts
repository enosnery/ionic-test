import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: any;
  password: any;
  json: any;
  constructor(public http: HttpClient, public navCtrl: NavController) { }

  ngOnInit() {
  }

  login(form) {
  this.http.get('../assets/users.json').subscribe((res) => {
      this.json = res;
      for (const item of this.json) {
      if (item.username === form.form.value.user) {
        this.navCtrl.navigateForward('/main');
      }
    }
  });
  }

}
