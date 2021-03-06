import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from 'angular-web-storage';
import {ActivatedRoute} from '@angular/router';
declare const $: any;
declare const Morris: any;
declare const slimscroll: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  date = new Date();
  parametres :any;
  constructor(private route: ActivatedRoute,
              public local: LocalStorageService) {
    this.parametres = this.local.get("param");
    console.log(this.parametres);
  }


  ngOnInit() {

  }


}
