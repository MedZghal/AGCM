import {Component, OnInit,ViewEncapsulation} from '@angular/core';
import {BackendService} from '../../backend.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import {LocalStorageService} from 'angular-web-storage';
declare const $: any;

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SingInComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  date = new Date();
  year = this.date.getFullYear();


  constructor(public  service: BackendService,
              private router: Router,
              private formBuilder: FormBuilder,
              public local: LocalStorageService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService) { }

  ngOnInit() {
    $("body").addClass("authentication sidebar-collapse");
    $(".navbar-toggler").on('click',function() {
      $("html").toggleClass("nav-open");
    });

    $('.form-control').on("focus", function() {
        $(this).parent('.input-group').addClass("input-group-focus");
    }).on("blur", function() {
        $(this).parent(".input-group").removeClass("input-group-focus");
    });

    this.registerForm = this.formBuilder.group({
      username: ['',Validators.required ],
      pass: ['', [Validators.required, Validators.minLength(3)]]
    });

  }



  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

    loginUser(){
      this.spinner.show();
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
        this.spinner.hide();
        return;
      }

      this.service.get('LoginUser',this.registerForm.value)
        .subscribe(
          data => {
            if(data[0] != null){
              this.spinner.hide();
              this.local.set("param", data[0]);
              this.router.navigate(['dashboard']);
            }
            else{
              this.spinner.hide();
              this.toastr.error("nom d'utilisateur ou mot de passe incorrect", 'Erreur');
              console.log("nom d'utilisateur ou mot de passe incorrect");
            }

          },
          error =>{

          }

        );
    }



}
