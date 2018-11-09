import { Component, OnInit, ViewEncapsulation } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SingUpComponent implements OnInit {

  year = (new Date()).getFullYear();

  constructor() { }

  ngOnInit() {
    $(".navbar-toggler").on('click',function() {
        $("html").toggleClass("nav-open");
    });
    $("body").addClass("authentication sidebar-collapse");
  }

}
