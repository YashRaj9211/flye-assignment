import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserFormComponent } from './components/user-from/user-from.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserService } from './services/user-service.service';
import { UserChartComponent } from './components/user-chart/user-chart.component';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    UserListComponent,
    UserChartComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    UserService,
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
