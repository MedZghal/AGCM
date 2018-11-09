import { Component, OnInit, ViewEncapsulation } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-page500',
  templateUrl: './page500.component.html',
  styleUrls: ['./page500.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class Page500Component implements OnInit {

  year = (new Date()).getFullYear();

  constructor() { }

  ngOnInit() {
    $(".navbar-toggler").on('click',function() {
      $("html").toggleClass("nav-open");
  });
  $("body").addClass("authentication sidebar-collapse");
  }

}
