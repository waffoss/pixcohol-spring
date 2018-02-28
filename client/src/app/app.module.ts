import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RoutingModule } from './components/common/routing/routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';



import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { PageNotFoundComponent } from './components/common/page-not-found/page-not-found.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ListComponent } from './components/pages/posts/list/list.component';
import { CreateComponent } from './components/pages/posts/create/create.component';
import { ProfileComponent } from './components/pages/users/profile/profile.component';
import { PostComponent } from './components/pages/posts/post/post.component';
import { FavoritesComponent } from './components/pages/users/favorites/favorites.component';
import { AdminComponent } from './components/pages/admin/admin.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    HomeComponent,
    ListComponent,
    CreateComponent,
    ProfileComponent,
    PostComponent,
    FavoritesComponent,
    AdminComponent,
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
