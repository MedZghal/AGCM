import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-rdv',
  templateUrl: './rdv.component.html',
  styleUrls: ['./rdv.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class RdvComponent implements OnInit {

  date = new Date();

  constructor() { }

  ngOnInit() {
  }

}
