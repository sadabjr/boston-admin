import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { NewBlogComponent } from '../../pages/new-blog/new-blog.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],

})
export class HeaderComponent {
  constructor (private _dialog: MatDialog) {}
  openNewBlog(){
    this._dialog.open(NewBlogComponent)
  }
}
