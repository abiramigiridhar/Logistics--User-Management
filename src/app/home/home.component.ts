import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { DataService } from '../services/data.service.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  public users = [];
  public tableColumns: string[] = ['userName', 'firstName', 'lastName', 'salary', 'emailid', 'action'];
  public resultsLength = 0;
  public pagesize = 10;
  public isAdmin: boolean = JSON.parse(localStorage.user) === 'admin';

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;


  constructor(
    private dataService: DataService
  ) { }
  ngOnInit(): void {
    this.refresh(this.getFetchData());
  }

  ngAfterViewInit(): void {
    if (this.sort) {
      this.sort.sortChange.subscribe((sort: Sort) => {
        this.paginator.pageIndex = 0;
        this.refresh(this.getCurrentList());
      });

      this.paginator.page.subscribe((page: PageEvent) => {

        this.refresh(this.getCurrentList());
      });
  }

  }

  deleteUserOption(id) {
    const userData = JSON.parse(localStorage.userList);
    const filteredData = userData.filter((user) => user.id !== id);
    localStorage.userList = JSON.stringify(filteredData);
    this.refresh(this.getCurrentList());
  }



  getCurrentList() {
    const options = {
      sortField: this.sort.active,
      sortDirection: this.sort.direction,
      page: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize
    };

    return options;
  }

  refresh(options) {
    this.dataService.findUsers(options).subscribe((result) => {
      this.resultsLength = result.total;
      this.users = result.items;
    });
  }

  getFetchData() {
    const options = {
      sortField: 'firstName',
      sortDirection: 'asc',
      page: 0,
      pageSize: this.pagesize
    };

    return options;
  }

}
