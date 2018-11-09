import {Component, OnInit, Renderer2} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit{
  previousUrl: string;

  constructor(private renderer: Renderer2, private router: Router) {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          if (this.previousUrl) {
            this.renderer.removeClass(document.body, this.previousUrl);
          }
          const currentUrl = event.url.split('/');
          const currentUrlSlug = currentUrl[currentUrl.length - 1];
          if (currentUrlSlug) {
            this.renderer.addClass(document.body, currentUrlSlug);
          }
          this.previousUrl = currentUrlSlug;
        }
      });


  }

  ngOnInit(): void {
    $("ul#ticker01").liScroll({travelocity: 0.05});
  }
}
