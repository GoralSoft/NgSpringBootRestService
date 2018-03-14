import { Component, OnInit } from '@angular/core';
// import { HeadermenuComponent } from '../headermenu/headermenu.component';
import {AuthService} from '../../services/auth.service';
import {User} from '../../model/model.user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 // hmenu: HeadermenuComponent;
  constructor() {

  }

  ngOnInit() {

  }

}
