import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';

export interface Request {
  id: number;
  name: string;
  startTime: Date;
  status: number;
  endTime: Date;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})

export class MainPage implements OnInit {
  requests: Request[];
  json: any;
  constructor(public http: HttpClient) { }

  ngOnInit() {
  this.requests = [];
  this.loadRequests();
  }

  loadRequests() {
    this.http.get('../assets/requests.json').subscribe((res) => {
      this.json = res;
      for (const item of this.json) {
        this.requests.push({id: item.id, name: item.name, startTime: item.startTime, status: item.status, endTime: item.endTime});
      }
      console.log(this.requests);
    });
  }
}
