import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NewBlogComponent } from './new-blog.component';

const newBlog: Routes = [{path: '', component: NewBlogComponent}]

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(newBlog)
  ]
})
export class NewBlogModule { }
