import {Component, OnInit, Renderer2} from '@angular/core';
import {Router, ActivatedRoute, NavigationStart} from '@angular/router';
import {LocalStorageService} from 'angular-web-storage';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    previousUrl: string;
    parametres :any ;

  constructor(private renderer: Renderer2,
              private router: Router,
              private route: ActivatedRoute,
              public local: LocalStorageService) {


    // this.route.queryParams.subscribe(params => {
    //   this.parametres = params["param"];
    // });
    // console.log(JSON.parse(this.parametres) );
    this.parametres = this.local.get("param");
    console.log(this.parametres);
  }

    ngOnInit() {

      console.log(this.parametres);
    }

}
