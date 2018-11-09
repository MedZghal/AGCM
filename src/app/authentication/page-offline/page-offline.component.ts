import { Component, OnInit, ViewEncapsulation } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-page-offline',
  templateUrl: './page-offline.component.html',
  styleUrls: ['./page-offline.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PageOfflineComponent implements OnInit {

  year = (new Date()).getFullYear();

  constructor() { }

  ngOnInit() {
    $(".navbar-toggler").on('click',function() {
        $("html").toggleClass("nav-open");
    });
    $("body").addClass("authentication sidebar-collapse");
  }

}
