import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BackendService} from '../backend.service';
import {LocalStorageService} from 'angular-web-storage';
declare const  $:any;

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class UploadFileComponent implements OnInit {

  element: HTMLFormElement;
  date = new Date();
  singleUploadForm: FormGroup;
  patient :any;
  constructor(private formBuilder: FormBuilder,
              public service:BackendService,
              public local: LocalStorageService) {}

  ngOnInit() {

    this.patient = this.local.get("patient");

    this.singleUploadForm = this.formBuilder.group({
      file :['',Validators.required]
    });


    $(function () {


      let krajeeGetCount = function(id) {
        let cnt = $('#' + id).fileinput('getFilesCount');
        return cnt === 0 ? "Vous n'avez plus de fichiers." :
          'Tu as ' +  cnt + ' fichier' + (cnt > 1 ? 's' : '') + ' restant.';
      };

      $("#file").on('filebeforedelete', function() {
        return new Promise(function(resolve, reject) {
          $.confirm({
            title: 'Confirmation!',
            content: 'Êtes-vous sûr de vouloir supprimer ce fichier?',
            type: 'red',
            buttons: {
              Oui: {
                btnClass: 'btn-primary text-white',
                keys: ['enter'],
                action: function(){
                  resolve();
                }
              },
              Annuler: function(){
                $.alert('La suppression du fichier a été annulée! ' + krajeeGetCount('file'));
              }
            }
          });
        });
      }).on('filedeleted', function() {
        setTimeout(function() {
          $.alert('La suppression du fichier a réussi! ' + krajeeGetCount('file'));
        }, 200);
      });
    });
  }



  uploadFile(formData ,typeUpload){

    this.service.post(typeUpload,formData).subscribe(
      data =>{
        console.log(data);
      },
      error =>{
        console.log(error);
      }
    )
  }

  public uploadfileSingle(event){

    let file = event.target;
    let formData = new FormData(file);
    this.uploadFile(formData,'uploadFile');

  }

  public uploadfileMulti(event){

    let file = event.target;

    let formData = new FormData(file);
    this.uploadFile(formData,'uploadMultipleFiles');

  }
}
