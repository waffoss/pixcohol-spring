import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../../auth/login/login.component';
import { RegisterComponent } from '../../auth/register/register.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { HomeComponent } from '../../pages/home/home.component';
import { CreateComponent } from '../../pages/posts/create/create.component';
import { ProfileComponent } from '../../pages/users/profile/profile.component';
import { PostComponent } from '../../pages/posts/post/post.component';
import { FavoritesComponent } from '../../pages/users/favorites/favorites.component';
import { AdminComponent } from '../../pages/admin/admin.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'new', component: CreateComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'post/:id', component: PostComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'superuser', component: AdminComponent },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class RoutingModule { }
