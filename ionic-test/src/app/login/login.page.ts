import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
// tslint:disable-next-line:import-spacing
import { Storage } from  '@ionic/storage';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: any;
  password: any;
  json: any;
  constructor(public http: HttpClient, public navCtrl: NavController, public storage: Storage) { }

  ngOnInit() {
      this.storage.get('user').then((val) => {
          if (val != null) {
              this.navCtrl.navigateForward('/main');
          }
          }
      );
  }

  login(form) {
  this.http.get('../assets/users.json').subscribe((res) => {
      this.json = res;
      for (const item of this.json) {
      if (item.username === form.form.value.user && item.password === form.form.value.password) {
        this.storage.set('user', item.username);
        this.navCtrl.navigateForward('/main');
      }
    }
  });
  }

}
