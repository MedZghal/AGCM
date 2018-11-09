import {Component, OnInit, ViewEncapsulation,EventEmitter} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BackendService} from '../backend.service';
import {LocalStorageService} from 'angular-web-storage';
import {Router} from '@angular/router';


declare const Backbone: any;
declare const Backgrid: any;
declare const _: any;


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class PatientComponent implements OnInit {

  date = new Date();

  medic :any ;
  orderForm: FormGroup;
  items: FormArray;
  consultsLoading = false;

  constructor(private formBuilder: FormBuilder,
              public service:BackendService,
              public local: LocalStorageService,
              private router: Router) {

  }

  ngOnInit() {
    this.local.set("Consult",'false');
    this.createBackGrid();

    this.consultsLoading =true;
    this.service.get('/ListMedic').subscribe(
      data =>{
        this.medic =data;
        this.consultsLoading =false;
      },
      error =>{

      }
    );

    this.orderForm = this.formBuilder.group({
      items: this.formBuilder.array([ this.createItem() ])
    });
  }


  to_DatesTRING(date){
    return (new Date(date)).toLocaleDateString();
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      name: [null,Validators.required],
      Posologie0: ['',Validators.required],
      Posologie1: [null,Validators.required],
      Posologie2: ['',Validators.required],
      Posologie3: [null,Validators.required],
      Posologie4: ['',Validators.required],
      Posologie5: [null,Validators.required]
    });
  }

  addItem(): void {
    this.items = this.orderForm.get('items') as FormArray;
    this.items.push(this.createItem());
    console.log(this.items.value);
  }

  deleteRow(index: number) {
    // control refers to your formarray
    this.items = this.orderForm.get('items') as FormArray;
    // remove the chosen row
    this.items.removeAt(index);
  }

  get formData() { return <FormArray>this.orderForm.get('items'); }

  createBackGrid() {

    let cls = this;

    let Territory = Backbone.Model.extend({});
    let Territories = Backbone.PageableCollection.extend({
      model: Territory,
      url: "https://medproapp.ddns.net/Clinique/PatientByCodMed?codeMedTrit=1",
      mode: "client",
      state: {
        firstPage: 1,
        pageSize: 9
      },
      queryParams: {
        totalPages: null,
        totalRecords: null,
        sortKey: "sort"
      },

      parseState: function (resp, queryParams, state, options) {
        return {totalRecords: resp.total_count};
      }
    });

    let territories = new Territories();


    let partage;
    let columns = [
      {
        name: "sexe",
        label: "",
        editable: false,
        cell: Backgrid.Cell.extend({
          className: "image-cell",

          render: function () {
            this.$el.empty();
            this.$el.html(this.renderImage(this.model));
            this.delegateEvents();
            return this;
          },

          renderImage: function (model) {
//                partage = GetListPatientByFichPatient(paramater.codeMedTrit.codeMedTrit,this.model.get("numFichPatient"));
            let data = this.model.get("sexe");
            let datenaiss = this.model.get("datenaiss");
            let age = 20;
            // GetAge(datenaiss);
            let IMG = "";
            if (data === "Femme") {

              if (age < 12)
                IMG = '<img src="./assets/img/avatars/icon_girl-512.png" width="40" alt="" />';
              else if (age >= 12 && age <= 20)
                IMG = '<img src="./assets/img/avatars/girl.png" width="40" alt="" />';
              else if (age > 20 && age <= 50)
                IMG = '<img src="./assets/img/avatars/034-user-6.png" width="40" alt="" />';
              else
                IMG = '<img src="./assets/img/avatars/019-social-1.png" width="40" alt="" />';
            }
            else {
              if (age < 12)
                IMG = '<img src="./assets/img/avatars/icon_boy-512.png" width="40" alt="" />';
              else if (age >= 12 && age <= 20)
                IMG = '<img src="./assets/img/avatars/boy.png" width="40" alt="" />';
              else if (age > 20 && age <= 50)
                IMG = '<img src="./assets/img/avatars/043-man-1.png" width="40" alt="" />';
              else
                IMG = '<img src="./assets/img/avatars/042-man-2.png" width="40" alt="" />';
            }
            return IMG;
          }

        })

      },
      {
        name: "numFichPatient", // The key of the model attribute
        label: "Patient", // The name to display in the header
        editable: false, // By default every cell in a column is editable, but ID shouldn't be
        // Defines a cell type, and ID is displayed as an integer without the ',' separating 1000s.
        cell: Backgrid.Cell.extend({
          render: function (e) {
            let cnam = "", apci = "", AutreAurr = "";
            this.$el.empty();
            let nom = this.model.get("numFichPatient");

            if (this.model.get("assurCnam") !== null)
              cnam = "<img src='./assets/img/cnam.png' style='width: 28px;' >&nbsp;";
            if (this.model.get("codeApci") !== "")
              apci = "<img src='./assets/img/apci_logo_600w.png' style='width: 28px;' >&nbsp;";
            if (this.model.get("autreAssur") !== "")
              // AutreAurr = "<img src='./assets/img/apci_logo_600w.png' style='width: 28px;' >&nbsp;";
              AutreAurr = cls.AutreAssurImg(this.model.get("autreAssur"));

            this.$el.html(nom + "<br/> " + cnam + " " + apci + " " + AutreAurr);

            return this;
          }
        })
      },
      {
        name: "",
        label: "Name et Prénom",
        editable: false,
        // The cell type can be a reference of a Backgrid.Cell subclass, any Backgrid.Cell subclass instances like id above, or a string
        cell: Backgrid.StringCell.extend({
          render: function (e) {

            this.$el.empty();
            let nom = this.model.get("nom");
            let prenom = this.model.get("prenom");
            this.$el.append(nom + " " + prenom);

            return this;
          }
        }) // This is converted to "StringCell" and a corresponding class in the Backgrid package namespace is looked up
      },
      {
        name: "assurCnam.identUnique",
        label: "Identifiant Unique",
        editable: false,

        // The cell type can be a reference of a Backgrid.Cell subclass, any Backgrid.Cell subclass instances like id above, or a string
        cell: Backgrid.StringCell.extend({
          render: function (e) {
            let assurCNAM = this.model.get("assurCnam");
            this.$el.empty();
            if (assurCNAM !== null)
              this.$el.append("N° " + assurCNAM.identUnique.toString());
            else
              this.$el.append("");

            return this;
          }
        })
      },
      {
        name: "datenaiss",
        label: "Date Naissance",
        editable: false,
        cell: Backgrid.StringCell.extend({
          className: 'date-cell',
          render: function (e) {

            this.$el.empty();
            let date = this.model.get("datenaiss");
            this.$el.append((new Date(date)).toLocaleDateString());

            return this;
          }
        })
      },
      {
        name: "",
        label: "Age",
        editable: false,

        // The cell type can be a reference of a Backgrid.Cell subclass, any Backgrid.Cell subclass instances like id above, or a string
        cell: Backgrid.StringCell.extend({
          render: function (e) {

            this.$el.empty();
            let DateNaiss = this.model.get("datenaiss");
            let age = 20;
            if (age === 0)
              age++;

            this.$el.append(age + " ans");

            return this;
          }

        })
      },
      {
        name: "poids",
        label: "Poids",
        editable: false,

        // The cell type can be a reference of a Backgrid.Cell subclass, any Backgrid.Cell subclass instances like id above, or a string
        cell: Backgrid.StringCell.extend({
          render: function (e) {

            this.$el.empty();
            this.$el.append(this.model.get("poids") + " Kg");

            return this;
          }
        })
      },
      {
        name: "adresse",
        label: "Adresse",
        editable: false,

        // The cell type can be a reference of a Backgrid.Cell subclass, any Backgrid.Cell subclass instances like id above, or a string
        cell: Backgrid.StringCell.extend({
          className: 'string-cell-2'

        })
      },
      {
        name: "fixe",
        label: "Fixe",
        editable: false,

        // The cell type can be a reference of a Backgrid.Cell subclass, any Backgrid.Cell subclass instances like id above, or a string
        cell: Backgrid.StringCell.extend({
          className: 'string-cell-2'

        })
      },
      {
        name: "gsm",
        label: "Gsm",
        editable: false,

        // The cell type can be a reference of a Backgrid.Cell subclass, any Backgrid.Cell subclass instances like id above, or a string
        cell: Backgrid.StringCell.extend({
          className: 'string-cell-2'

        })
      },
      {
        name: "ville.ville",
        label: "Ville",
        editable: false,
        cell: Backgrid.StringCell.extend({
          className: 'string-cell-2'
        })
      },
      {
        name: "",
        label: "Action",
        editable: false,
        // The cell type can be a reference of a Backgrid.Cell subclass, any Backgrid.Cell subclass instances like id above, or a string
        cell: Backgrid.Cell.extend({
          className: 'action-cell',
          //template: _.template('<ul class="social-icons"> <li><a id="edit" data-tooltip="tooltip" title="" href="javascript:void(0);" data-placement="top"  data-original-title="Modifier" class="tooltips myspace"> </a> </li><li><a id="Consult" href="javascript:;" data-original-title="Conultation" class="last-fm"> </a></li><li><a id="delete" href="javascript:;" data-original-title="Supprimer" class="dropbox"> </a></li><li><a id="File" href="#" data-original-title="File" class="last-fm"> </a></li><li><a id="Partage" href="#" data-original-title="Partage" class="last-fm"> </a></li></ul>'),
//                template: _.template('<ul class="action-icons"> <li><a id="edit"  data-tooltip="tooltip" title="Modifier" data-placement="top"   class="btn btn-icon-only red tooltips"><i ><img style=" margin-top: -4px;width:25px;" src="./assets/img/userM.png" ></i></a></li><li><a id="Consult" data-tooltip="tooltip" title="Observation" data-placement="top"  class="btn btn-icon-only red tooltips"><i ><img style=" margin-top: -4px;width:25px;" src="./assets/img/userC.png" ></i></a></li><li><a id="delete" data-tooltip="tooltip" title="Supprimer" data-placement="top" class="btn btn-icon-only red tooltips"><i ><img style=" margin-top: -4px;width:25px;" src="./assets/img/userDel.png" ></i></a></li><li><a id="File" data-tooltip="tooltip" title="File" data-placement="top"  class="btn btn-icon-only red tooltips"><i ><img style=" margin-top: -4px;width:25px;" src="./assets/img/userF.png" ></i></a></li><li><a id="Partage" data-tooltip="tooltip" title="Partager" data-placement="top"  class="btn btn-icon-only red tooltips"><i ><img style=" margin-top: -4px;width:25px;" src="./assets/img/userP.png" ></i></a></li></ul>'),
          template: _.template('<div class="btn-group">' +
            '<button class="btn btn-primary dropdown-toggle" data-toggle="dropdown">' +
            '<i class="zmdi zmdi-rotate-right zmdi-hc-spin"></i> <span class="caret"></span>' +
            '</button>' +
            '<ul class="dropdown-menu dropdown-menu-right pullDown">' +
            '<li><a id="Consult" ><i ><img class="iconMenu" src="./assets/img/ConsultIcon.png" ></i><div class="spanMenu"> Consultation</div></a></li>' +
            '<li><a id="Archive" ><i ><img class="iconMenu" src="./assets/img/userC.png" ></i><div class="spanMenu"> Archive</div></a></li>' +
            '<li><a id="File" data-toggle="modal" data-target="#UploadModal" ><i ><img class="iconMenu" src="./assets/img/userF.png" ></i><div class="spanMenu"> Piece jointe</div></a></li>' +
            '<li><a id="Partage" ><i ><img class="iconMenu" src="./assets/img/userP.png" ><div class="spanMenu"> Partager dossier</div></i></a></li>' +
            '<li class="divider"></li>' +
            '<li><a id="edit" ><i ><img class="iconMenu" src="./assets/img/userM.png" ></i><div class="spanMenu"> Modifier</div></a></li>' +
            '<li><a id="delete" ><i ><img class="iconMenu" src="./assets/img/userDel.png" ><div class="spanMenu"> Supprimer</div></i></a></li>' +
            '<li class="divider"></li>' +
            '<li><a id="labo" ><i ><img class="iconMenu" src="./assets/img/bloc.png" ><div class="spanMenu"> Demande labo</div></i></a></li>' +
            '<li><a id="Radio" ><i ><img class="iconMenu" src="./assets/img/bilan.png" ><div class="spanMenu"> Demande Radio</div></i></a></li>' +
            '<li><a id="dicompacs" ><i ><img class="iconMenu" src="./assets/img/radio.png" ><div class="spanMenu"> Demande Pacs </div></i></a></li>' +
            '</ul></div>'),

          events: {
            "click a#edit": "ClickEdit",
            "click a#delete": "ClickDelete",
            "click a#Consult": "ClickConsult",
            "click a#File": "FileEdit",
            "click a#Partage": "FilePartage",
            "click a#Archive": "ArchiveConsult",
            "click a#dicompacs": "DicomPacs"
          },
          render: function () {
            let numpt = this.model.get("numFichPatient");
            this.$el.html(this.template());

            this.delegateEvents();
            return this;
          },
          DicomPacs: function () {

          },
          FilePartage: function () {
          },
          ClickEdit: function () {

          },
          ArchiveConsult: function () {
            let patient = this.model.get("numFichPatient");
            cls.local.set("patient",patient);
            cls.local.set("Consult",'true');
            cls.router.navigate(['Archive_Medical']);
          },
          FileEdit: function () {
            let patient = this.model.get("numFichPatient");
            cls.local.set('patient',patient);
            let initialPreviews=[];
            let initialPreviewsConfig=[];

            $.ajax({
              type: "GET",
              url: "https://medproapp.ddns.net/Clinique/ViewAllFileByPatient?num_patient="+patient,
              success: function (response) {
                initialPreviews=[];
                initialPreviewsConfig=[];
                for(let f of response){
                  let conditionImg = ['png','jpg','jpeg','gif','x-icon'];
                  let conditionVideo = ['mp4','wav','3gpp'];
                  let conditionOffice = ['doc','docx','xls','ppt','pptx','vnd.openxmlformats-officedocument.presentationml.presentation','msword','vnd.ms-powerpoint'];
                  let conditionGdocs = ['tif','ai','eps'];
                  let conditionOthers = ['dicom','octet-stream'];
                  let type ;
                  let switchVal =f[2].toString().split('/')[1];
                  switch (switchVal) {
                    case (conditionImg.includes(switchVal)?switchVal:null) : type = 'image' ;
                      break;
                    case 'pdf' :  type = 'pdf' ;
                      break;
                    case 'plain' :  type = 'text' ;
                      break;
                    case 'html' :  type = 'html' ;
                      break;
                    case (conditionVideo.includes(switchVal)?switchVal:null) :  type = 'video' ;
                      break;
                    case (conditionOffice.includes(switchVal)?switchVal:null) :  type = 'office' ;
                      break;
                    case (conditionGdocs.includes(switchVal)?switchVal:null):  type = 'gdocs' ;
                      break;
                    case (conditionOthers.includes(switchVal)?switchVal:null):  type = 'other' ;
                      break;

                  }

                  if(type != 'other')
                    initialPreviewsConfig.push({
                      key:f[0],
                      filename :f[1],
                      type: type,
                      caption :f[1],
                      url :'https://medproapp.ddns.net/Clinique/DeleteFile',
                      extra: {fileId: f[0]}
                    });
                  else
                    initialPreviewsConfig.push({
                      key:f[0],
                      filename :f[1],
                      caption :f[1],
                      url :'https://medproapp.ddns.net/Clinique/DeleteFile',
                      extra: {fileId: f[0]}
                    });

                  initialPreviews.push('https://medproapp.ddns.net/Clinique/ViewFile/'+f[0]);
                }
                cls.initfiles(initialPreviews,initialPreviewsConfig,patient);
                // process response
              },
              error: function (error) {
                console.log(error);
                // process error
              }
            });


          },
          ClickConsult: function () {

          },
          ClickDelete: function () {

          }

        })


      }
    ];


    let FocusableRow = Backgrid.Row.extend({
      highlightColor: '#BAD2E4',
      events: {
        click: 'Click',
        mouseover: 'mouseovercard'
      },
      rowFocused: function () {
        $('tbody.table-editable tr').removeAttr('style');
        this.$el.css('background-color', this.highlightColor);
      },
      Click: function () {
        let patient = this.model.get("numFichPatient");
        console.log(patient);
      },
      mouseovercard: function () {
        console.log('hello world');
        /*let template='<button class="btn btn-default btn-xs item_button_remove"><span class="glyphicon glyphicon-trash"></span> <span data-i18n="Hide">Hide</span></button>';
          this.$el.append(template);*/
      }
    });

    /*let ScrollableBody = Backgrid.Body.extend({
  // maybe you'd like to implement table body that is a block element so you can detect scroll events,
  // and may be implement fixed header (wink wink) https://github.com/wyuenho/backgrid/issues/4
});*/
// Initialize a new Grid instance
    let grid = new Backgrid.Grid({

      columns: columns,
      collection: territories,
      //row: FocusableRow,
//        className: 'table table-bordered  table-editable no-margin table-hover full-height-content full-height-content-scrollable'
      className: 'backgrid table-hover table-bordered'
      //body: window.Backgrid.SummedColumnBody.extend({ columnsToSum: ['name', 'value'] })
    });

    let patientSideFilter = new Backgrid.Extension.ClientSideFilter({

      collection: territories,
      placeholder: "Recherche Par Patient",
      id: "rechercher",
      fields: ['numFichPatient', 'nom', 'prenom', 'datenaiss.year', 'adresse', 'ville.ville'],
      wait: 150
    });
    // $(patientSideFilter.el).css({float: "left", margin: "0 0 10px 0"});

    $("#contents").before(patientSideFilter.render().el);
    document.getElementById("search").focus();

// Render the grid and attach the root to your HTML document
    $("#contents").append(grid.render().el);

    let paginator = new Backgrid.Extension.Paginator({
      collection: territories
    });
    $("#contents").append(paginator.render().el);


    console.log(grid.collection.state);
    console.log(territories);
    territories.fetch({reset: true});
    console.log(territories.fullCollection.length);
  }


  initfiles(initialPreviews,initialPreviewsConfig,patient) {

    $("#file").fileinput('destroy');
    $("#file").fileinput({
      initialPreview: initialPreviews,
      initialPreviewDownloadUrl: 'https://medproapp.ddns.net/Clinique/downloadFile/{key}',
      initialPreviewConfig: initialPreviewsConfig,
      initialPreviewAsData: true,
      browseOnZoneClick: true,
      language: 'fr', // utilise le js de traduction
      overwriteInitial: false,
      purifyHtml: true,
      browseClass: "btn btn-primary btn-block",
      uploadUrl: "https://medproapp.ddns.net/Clinique/uploadMultipleFiles",
      uploadExtraData: {
        num_patient: patient
      },
      validateInitialCount: true,
      preferIconicPreview: true,
      previewFileIconSettings: {
        'doc': '<i class="fa fa-file-word text-primary"></i>',
        'xls': '<i class="fa fa-file-excel text-success"></i>',
        'ppt': '<i class="fa fa-file-powerpoint text-danger"></i>',
        'jpg': '<i class="fas fa-file-image text-danger"></i>',
        'gif': '<i class="fas fa-file-image text-muted"></i>',
        'png': '<i class="fas fa-file-image text-primary"></i>',
        'pdf': '<i class="fa fa-file-pdf text-danger"></i>',
        'zip': '<i class="fa fa-file-archive text-muted"></i>',
        'htm': '<i class="fa fa-file-code text-info"></i>',
        'txt': '<i class="fa fa-file-text text-info"></i>',
        'mov': '<i class="fa fa-file-movie text-warning"></i>',
        'mp3': '<i class="fa fa-file-audio text-warning"></i>',
      },
      previewFileExtSettings: {
        'doc': function (ext) {
          return ext.match(/(doc|docx)$/i);
        },
        'xls': function (ext) {
          return ext.match(/(xls|xlsx)$/i);
        },
        'ppt': function (ext) {
          return ext.match(/(ppt|pptx)$/i);
        },
        'zip': function (ext) {
          return ext.match(/(zip|rar|tar|gzip|gz|7z)$/i);
        },
        'htm': function (ext) {
          return ext.match(/(php|js|css|htm|html)$/i);
        },
        'txt': function (ext) {
          return ext.match(/(txt|ini|md)$/i);
        },
        'mov': function (ext) {
          return ext.match(/(avi|mpg|mkv|mov|mp4|3gp|webm|wmv)$/i);
        },
        'mp3': function (ext) {
          return ext.match(/(mp3|wav)$/i);
        },
      }
    });
    $("#file").fileinput('enable');

  }


  AutreAssurImg(Assur){
    var AutreAurr;
    if(Assur === "STEG")
      AutreAurr ="<img src='./assets/img/steg_.png' style='width: 35px;' >";
    else
    if(Assur === "COMAR")
      AutreAurr ="<img src='./assets/img/ag42-logo_assurance_comar.png' style='width: 35px; height:16px;' >";
    else
    if(Assur === "MAGHREBIA")
      AutreAurr ="<img src='./assets/img/MAGHREBIA.png' style='width: 55px; height:20px;' >";
    else
      AutreAurr ="<img src='./assets/img/amen.png' style='width: 35px; height:20px;' >";

    return AutreAurr;
  };

}

