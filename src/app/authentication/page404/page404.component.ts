import { Component, OnInit, ViewEncapsulation } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class Page404Component implements OnInit {

  year = (new Date()).getFullYear();

  constructor() { }

  ngOnInit() {
    $("body").addClass("authentication sidebar-collapse");
    $(".navbar-toggler").on('click',function() {
        $("html").toggleClass("nav-open");
    });
  }

}
