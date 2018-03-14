import { Component, OnInit } from '@angular/core';
import {MenuModule} from 'primeng/menu';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import {AuthService} from '../../services/auth.service';
import {User} from '../../model/model.user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-headermenu',
  templateUrl: './headermenu.component.html',
  styleUrls: ['./headermenu.component.css']
})
export class HeadermenuComponent implements OnInit {
  currentUser: User;
  items: MenuItem[];
  constructor(public authService: AuthService, public router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        routerLink:['/home'],
        routerLinkActiveOptions: { exact: true }
        //icon: 'fa-file-o',
        /*items: [
          { label: 'New', routerLink: ['/proposal/create'], routerLinkActiveOptions: { exact: true } },
          { label: 'Open', routerLink: ['/proposal'], routerLinkActiveOptions: { exact: true } },
          { label: 'Quit' }
        ]*/
      },
      {
        label: 'Papers',
        routerLink:['/papers'],
        routerLinkActiveOptions: { exact: true }
      },
      {
        label: 'Students',
        routerLink:['/students'],
        routerLinkActiveOptions: { exact: true }
      }
    ];
  }

  // login out from the app
  logOut() {
    this.authService.logOut()
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {

        });
  }
}
