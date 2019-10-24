import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import * as moment from 'moment';
import {Storage} from '@ionic/storage';
import {NavController} from '@ionic/angular';
import {Request} from '../interface/Request';
import {ToastController} from '@ionic/angular';


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})

export class MainPage implements OnInit {
  requests: Request[];
  json: any;
  constructor(public http: HttpClient, public storage: Storage, public navCtrl: NavController, public toastController: ToastController) {  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Em desenvolvimento!',
      duration: 2000
    });
    toast.present();
  }
  ngOnInit() {
    this.storage.get('user').then((val) => {
      if (val == null) {
      this.navCtrl.navigateBack('/');
      }
    });
    this.requests = [];
    this.loadRequests();
  }

  loadRequests() {
    this.http.get('../assets/requests.json').subscribe((res) => {
      this.json = res;
      for (const item of this.json) {
        const tempTime1 = moment(item.startTime).format('h:mm d-MM-YYYY');
        const tempTime2 = moment(item.endTime).format('h:mm d-MM-YYYY');
        this.requests.push({id: item.id, name: item.name, startTime: tempTime1, status: item.status, endTime: tempTime2});
      }
    });
  }

  loadFilteredRequests(status) {
    this.requests = null;
    this.http.get('../assets/requests.json').subscribe((res) => {
      this.json = res;
      for (const item of this.json) {
        if (item.status === status) {
        const tempTime1 = moment(item.startTime).format('h:mm d-MM-YYYY');
        const tempTime2 = moment(item.endTime).format('h:mm d-MM-YYYY');
        this.requests.push({
            id: item.id,
            name: item.name,
            startTime: tempTime1,
            status: item.status,
            endTime: tempTime2
          });
        }
      }
    });
  }

  requestDetail(index) {
    this.navCtrl.navigateForward('/detail', {
      state: {
        request: this.requests[index]
      }
    });
  }


}
