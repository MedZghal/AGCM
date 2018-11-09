import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import {BackendService} from '../backend.service';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationComponent implements OnInit {

  date = new Date();
  patient :any;

  constructor(private router: ActivatedRoute,
              public localStorage: LocalStorage) { }

  ngOnInit() {
    this.patient = JSON.parse(localStorage.getItem('patient')) ;
    console.log(this.patient);
  }

}
