import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EditBlogComponent } from './edit-blog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const editBlog: Routes = [{ path: '', component: EditBlogComponent }];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(editBlog),
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class EditBlogModule {}
