import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { StudentComponent } from './tab/student/student.component';
import { StudentViewComponent } from './tab/student/student-view/student-view.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    StudentComponent,
    StudentViewComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    ComponentsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
