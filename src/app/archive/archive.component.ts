import {Component, OnInit, ViewChild} from '@angular/core';
import {BackendService} from '../backend.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import {LocalStorageService} from 'angular-web-storage';
import {NgSelectComponent} from '@ng-select/ng-select';


@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit  {

  @ViewChild('select1') select1: NgSelectComponent;
  patients :any[] =[];
  consults :any[] =[];
  selectedPersonId :any = null;
  consultsLoading = false;
  date = new Date();

  constructor(public service :BackendService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService,
              private localStorage: LocalStorageService) { }

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

    if(this.localStorage.get("patient")){
      let patient =this.localStorage.get("patient");
      this.selectedPersonId = patient ;
      this.getConsultByPatient(patient)
    }

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
    if(event !== undefined)
      this.getConsultByPatient(event.item.numFichPatient);
  }

  onSelect(event){
    console.log(this.selectedPersonId);
    console.log(event);
  }


  getConsultByPatient(numFichPatient){
    this.spinner.show();
    let param = {
      num_patient :numFichPatient
    };

    this.service.get("ListConsultationsbyPatient",param).subscribe(
      ( data:any ) => {
        this.consults =data;
        this.spinner.hide();
        if(data.length == 0)
          this.toastr.warning('Pas de consultation pour ce patient', 'Attention !!!');
      },
      err =>{

      }
    );
  }
}

