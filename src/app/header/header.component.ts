import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private readonly dataService: DataService, private readonly changeDetectorRef: ChangeDetectorRef) { }

  login: boolean;

  ngOnInit(): void {
      this.dataService.loginData.subscribe((data) => {
        this.login = data;
        this.changeDetectorRef.detectChanges();
      });
  }

  signout() {
    this.login = false;
    localStorage.user = '';
    this.dataService.loginData.next(false);
  }

}
