import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import "dhtmlx-scheduler";
import "dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_year_view";
import "dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_active_links";
import "dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_agenda_view";
import "dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_container_autoresize";
import "dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_serialize";
import "dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_quick_info";
import "dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_collision";
import "dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_minical";
import "dhtmlx-scheduler/codebase/ext/dhtmlxscheduler_recurring";
import "dhtmlx-scheduler/codebase/locale/locale_fr";
import "dhtmlx-scheduler/codebase/locale/recurring/locale_recurring_fr";
import {} from "@types/dhtmlxscheduler";

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SchedulerComponent implements OnInit {

  @ViewChild("scheduler_here") schedulerContainer: ElementRef;

  updateCalendar = scheduler.updateCalendar;

  constructor() { }

  ngOnInit() {



    scheduler.config.xml_date="%Y-%m-%d %H:%i";
    scheduler.config.prevent_cache = true;

    scheduler.config.details_on_create=true;
    scheduler.config.details_on_dblclick=true;
    scheduler.config.occurrence_timestamp_in_utc = true;
    scheduler.config.include_end_by = true;
    scheduler.config.repeat_precise = true;

    //the Year view will display only 6 months
    // scheduler.config.year_x = 3; //2 months in a row
    // scheduler.config.year_y = 4; //3 months in a column

    //default lightbox definition
    // scheduler.config.lightbox.sections=[
    //   {name:"description", height:200, map_to:"text", type:"textarea", focus:true},
    //   {name:"time", height:72, type:"time", map_to:"auto"}
    // ];
//change type:"time" -> type:"calendar_time"
    scheduler.config.lightbox.sections = [
      {name:"description", height:200, map_to:"text", type:"textarea", focus:true},
      {name:"time", height:72, type:"calendar_time", map_to:"auto" }
    ];

    scheduler.init(this.schedulerContainer.nativeElement, new Date());
    //
    // scheduler.updateCalendar = function(calendar, date){
    //   var startLimit = scheduler.config.limit_start;
    //   var endLimit = scheduler.config.limit_end;
    //
    //   var lastDayinMonth = new Date(date.getFullYear(), date.getMonth()+1, 0, 1);
    //
    //   if( (lastDayinMonth.getTime() < startLimit.getTime() ) || (date.getTime() > endLimit.getTime()) )
    //     return false;
    //
    //
    //   return this.updateCalendar.apply(this, arguments)
    // };
  }

  showMinical() {
    if (scheduler.isCalendarVisible()) {
      scheduler.destroyCalendar();
    } else {
      scheduler.renderCalendar({
        position: "dhx_minical_icon",
        date: new Date(),
        navigation: true,
        handler: function (date, calendar) {
          this.scheduler.setCurrentView(date);
          this.scheduler.destroyCalendar();
        }
      });
    }
  }


}
