import { Component, OnInit } from '@angular/core';
import {BackendService} from '../backend.service';
import { LocalStorage } from '@ngx-pwa/local-storage';
import * as moment from 'moment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-patient-modal',
  templateUrl: './patient-modal.component.html',
  styleUrls: ['./patient-modal.component.css']
})
export class PatientModalComponent implements OnInit {

  patients :any[] =[];
  selectedPersonId :any;
  consultsLoading = false;
  registerForm = this.formBuilder.group({
    patientSelect: ['',Validators.required ]
  });
  submitted = false;

  constructor(public service :BackendService,
              public localStorage: LocalStorage,
              private formBuilder: FormBuilder) { }

  ngOnInit() {


    let param = {
      codeMedTrit :'1'
    };

    this.consultsLoading =true;
    this.service.get("PatientByCodMed",param).subscribe(
      ( data:any ) => {
        this.patients =[];
        for(let p of data){
          this.patients.push({
            item :p,
            img : this.getImg(this.getAge(p.datenaiss) ,p.sexe)
          })
        }
        this.consultsLoading =false;
      },
      err =>{

      }
    );
  }

  customSearchFn(term: string, item: any) {
    term = term.toLocaleLowerCase();
    let nompres = item.item.prenom.toLocaleLowerCase() + " " +item.item.nom.toLocaleLowerCase();
    let id =item.item.numFichPatient.toString();
    return nompres.indexOf(term) > -1  || id.indexOf(term) > -1;
  }

  getImg(age ,sexe){
    let IMG = "";
    if (sexe === "Femme") {

      if (age < 12)
        IMG = './assets/img/avatars/icon_girl-512.png';
      else if (age >= 12 && age <= 20)
        IMG = './assets/img/avatars/girl.png';
      else if (age > 20 && age <= 50)
        IMG = './assets/img/avatars/034-user-6.png';
      else
        IMG = './assets/img/avatars/019-social-1.png';
    }
    else {
      if (age < 12)
        IMG = './assets/img/avatars/icon_boy-512.png';
      else if (age >= 12 && age <= 20)
        IMG = './assets/img/avatars/boy.png';
      else if (age > 20 && age <= 50)
        IMG = './assets/img/avatars/043-man-1.png';
      else
        IMG = './assets/img/avatars/042-man-2.png';
    }
    return IMG;
  }


  getAge(date){
    return moment().diff(moment(new Date(date), "DD-MM-YYYY"), 'years')
  }

  onChange(event){
    if(event !== undefined) {
      this.submitted = true;
      localStorage.setItem('patient', JSON.stringify(event));
    }
  }

  onSubmit(){
    console.log(this.registerForm.value);

  }

}
