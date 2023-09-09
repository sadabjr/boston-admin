import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ViewBlogComponent } from './view-blog.component';

const viewBlog: Routes= [{path: '', component: ViewBlogComponent}]

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(viewBlog)
  ]
})
export class ViewBlogModule { }
