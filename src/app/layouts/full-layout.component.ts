import { Component, OnInit } from '@angular/core';
import { JiraService } from '../service/jira.service';
import { UserRes } from '../interfaces/response';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {

  public disabled = false;
  public status: {isopen: boolean} = {isopen: false};
  public activedUser:UserRes ;
  public console = console ;

  constructor( private jira:JiraService) {
    this.activedUser = jira.activedUser ;
  }

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  ngOnInit(): void {
  }
}
