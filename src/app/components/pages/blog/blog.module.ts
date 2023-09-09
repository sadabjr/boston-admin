import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog.component';

const blog: Routes= [{path: '', component: BlogComponent }]

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(blog),
  ]
})
export class BlogModule { }
