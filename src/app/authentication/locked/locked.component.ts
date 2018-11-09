import { Component, OnInit, ViewEncapsulation } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-locked',
  templateUrl: './locked.component.html',
  styleUrls: ['./locked.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LockedComponent implements OnInit {

  year = (new Date()).getFullYear();

  constructor() { }

  ngOnInit() {
    $(".navbar-toggler").on('click',function() {
        $("html").toggleClass("nav-open");
    });
    $("body").addClass("authentication sidebar-collapse");
  }

}
