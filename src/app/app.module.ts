import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { AdminLayoutComponent } from './layouts/admin-layout/component/admin-layout.component';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    ComponentsModule,
    RouterModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgbModule,
    FormsModule,

    MatButtonModule, MatIconModule, MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
