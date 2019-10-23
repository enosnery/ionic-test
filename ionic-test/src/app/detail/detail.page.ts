import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Request} from '../interface/Request';
import {Router} from '@angular/router';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  request: Request;
  constructor(public http: HttpClient, public router: Router) {
    this.request = this.router.getCurrentNavigation().extras.state.request;
  }

  ngOnInit() {
  }

}
