import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'main',
    component: MainComponent,
    children: [
      {
        path: 'blogs',
        loadChildren: () =>
          import('./components/pages/blog/blog.module').then(
            (m) => m.BlogModule
          ),
      },
      {
        path: 'new-blog',
        loadChildren: () =>
          import('./components/pages/new-blog/new-blog.module').then(
            (m) => m.NewBlogModule
          ),
      },
      {
        path: 'edit-blog/:id',
        loadChildren: () =>
          import('./components/pages/edit-blog/edit-blog.module').then(
            (m) => m.EditBlogModule
          ),
      },
      {
        path: 'view-blog/:id',
        loadChildren: () =>
          import('./components/pages/view-blog/view-blog.module').then(
            (m) => m.ViewBlogModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
