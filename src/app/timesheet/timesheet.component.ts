import { Component, OnInit } from '@angular/core';
import { JiraService } from '../service/jira.service';
import { DatePipe } from '@angular/common';

import { UserRes,  WorklogRes,  WorklogsRes,  FieldsRes,  IssuesRes,  SearchRes } from './../interfaces/response' ;
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/every';
import { ActivatedRoute } from '@angular/router';

import { ElectronService } from "ngx-electron";

import * as _ from 'underscore/underscore';

@Component({
  selector: "app-timesheet",
  templateUrl: "./timesheet.component.html",
  styleUrls: ["./timesheet.component.css"]
})
export class TimesheetComponent implements OnInit {
  selectedUser: UserRes;
  users: UserRes[] = [];

  currentWeekStart: Date;
  currentWeekEnd: Date;
  labels: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  week: object;

  issues: IssuesRes[];
  issuesOriginal: IssuesRes[];
  weekdays: Date[];

  constructor(
    private route: ActivatedRoute,
    private jira: JiraService,
    private datePipe: DatePipe,
    private _electronService: ElectronService
  ) {
    this.currentWeekStart = new Date();
    this.currentWeekEnd = new Date();
    this.users = this.jira.users;
    this.selectUser(this.jira.activedUser);
  }
  selectUser(user) {
    this.selectedUser = user;
    this.setWeekStart();
  }

  filter() {
    this.week = _.mapObject(this.week, (d, i) => {
      return 0;
    });
    this.issues = _.clone(this.issuesOriginal);

    this.issues = _.filter(
      <any>this.issues,
      (issue: IssuesRes, i, l) => {
        let ret: Boolean = false;
        if (typeof issue.fields.worklog === "undefined") return false;
        _.each(
          issue.fields.worklog.worklogs,
          log => {
            if (
              this.currentWeekStart <= log.startedDate &&
              this.currentWeekEnd >= log.startedDate &&
              this.selectedUser.name === log.author.name
            ) {
              //  console.log( log.started ) ;
              const dd = this.datePipe.transform(log.startedDate, "dd-MM");
              const time = Math.round(log.timeSpentSeconds / 60 / 60);
              this.week[dd] += time;
              ret = true;
            }
          },
          this
        );
        // ret = true ;
        return ret;
      },
      this
    );
  }
  get() {
    const start = this.datePipe.transform(this.currentWeekStart, "yyyy-MM-dd");
    const eDate: Date = new Date(this.currentWeekEnd);
    //
    eDate.setDate(eDate.getDate() + 14);
    const endM = this.datePipe.transform(eDate, "yyyy-MM-dd");
    const end = this.datePipe.transform(this.currentWeekEnd, "yyyy-MM-dd");

    const jql =
      '( ( worklogDate>="' +
      start +
      '" and worklogDate<="' +
      endM +
      '") ' +
      'or  ( resolutiondate>="' +
      start +
      '" and resolutiondate<="' +
      end +
      '" ) ' +
      'or  ( status was "Fixing" DURING ( "' +
      start +
      '" ,"' +
      end +
      '") )  ' +
      'or  ( status was "In Progress" DURING ( "' +
      start +
      '" ,"' +
      end +
      '") ) ) ' +
      "and ( assignee =" +
      this.selectedUser.name +
      " or worklogAuthor = " +
      this.selectedUser.name +
      " ) ";
    const data = {
      jql: jql,
      startAt: 0,
      maxResults: 9999,
      fields: [
        "assignee",
        "sprint",
        "summary",
        "status",
        "project",
        "progress",
        "worklog",
        "timeoriginalestimate",
        "timespent"
      ]
    };
    console.log(jql);
    this.jira
      .post(
        "2/search",
        data // JSON.stringify( data )
      )
      .subscribe((res: SearchRes) => {
        // console.log( res ) ;
        res.issues.forEach(issue => {
          // if ( typeof issue.fields.worklog !== 'undefined' )
          issue.fields.worklog.worklogs.forEach(log => {
            log.startedDate = new Date(log.started.split("T")[0]);
          });
        });
        this.issuesOriginal = res.issues;
        this.issues = res.issues;
        this.filter();
      });
  }
  getLabelDay(label) {
    return this.weekdays[this.labels.indexOf(label)];
  }
  getLog(issue: IssuesRes, day: Date) {
    if (typeof issue.fields.worklog === "undefined") return "";
    const logs = issue.fields.worklog.worklogs;
    let log = 0;
    logs.forEach(l => {
      // console.log( l ) ;
      if (
        this.datePipe.transform(l.startedDate, "yyyy-MM-dd") ===
          this.datePipe.transform(day, "yyyy-MM-dd") &&
        l.author.name === this.selectedUser.name
      ) {
        log += Math.round(l.timeSpentSeconds / 60 / 60);
        // console.log( log ) ;
      }
    });
    return log ? log : "";
  }
  openIssue(e, issue) {
    console.log(e, issue);
    this._electronService.shell.beep();
    this._electronService.shell.openExternal("https://insynium.atlassian.net/browse/" + issue.key);
    return false;
  }
  setDays() {

    this.weekdays = [];
    for (let i = 0; i <= 6; i++) {
      const dd = new Date(this.currentWeekStart);
      dd.setDate(this.currentWeekStart.getDate() + i);
      this.weekdays.push(dd);
    }
  }
  setWeekStart() {
    this.currentWeekStart.setHours(0);
    if (this.currentWeekStart.getDay() === 0) {
      this.currentWeekStart.setDate(this.currentWeekStart.getDate() - 6);
    } else if (this.currentWeekStart.getDay() > 1) {
      this.currentWeekStart.setDate(
        this.currentWeekStart.getDate() + -this.currentWeekStart.getDay() + 1
      );
    }
    this.currentWeekEnd = new Date(this.currentWeekStart);
    this.currentWeekEnd.setDate(this.currentWeekStart.getDate() + 6);
    // just to trigger change
    this.currentWeekStart = new Date(this.currentWeekStart);
    this.currentWeekEnd = new Date(this.currentWeekEnd);
    this.setDays();
    this.get();

                                    this.week = {};
    const day = new Date(this.currentWeekStart);
    for (let i = 0; i < 7; i++) {
      const index = this.datePipe.transform(day, "dd-MM");
      this.week[index] = 0;
      day.setDate(day.getDate() + 1);
    }
    // console.log( this.week ) ;
  }
  ngOnInit() {}
  public thisWeek(e: Event) {
    this.currentWeekStart = new Date();
    this.setWeekStart();
  }
  public previousWeek(e: Event) {
    this.currentWeekStart.setDate(this.currentWeekStart.getDate() - 7);
    this.setWeekStart();
  }
  public nextWeek(e: Event) {
    this.currentWeekStart.setDate(this.currentWeekStart.getDate() + 7);
    this.setWeekStart();
  }
}
