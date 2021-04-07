import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResourceViewComponent } from './components/resource-view/resource-view.component';
import { LoaderComponent } from './components/loader/loader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoaderService } from './services/loader.service';
import { ResourceService } from './services/resource.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { LoaderInterceptorService } from './services/loader-interceptor.service';
import { LandingComponent } from './components/landing/landing.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { SettingComponent } from './components/setting/setting.component';
import { WikipediaService } from './services/wikipedia.service';
import { SettingService } from './services/setting.service';
import { SparqlViewComponent } from './components/sparql-view/sparql-view.component';
import { FormsModule } from '@angular/forms';
import { SparqlService } from './services/sparql.service';
import { SparqlResultsComponent } from './components/sparql-results/sparql-results.component';
import {SparqlResultsService} from './services/sparql-results.service';

@NgModule({
  declarations: [
    AppComponent,
    ResourceViewComponent,
    LoaderComponent,
    LandingComponent,
    SettingComponent,
    SparqlViewComponent,
    SparqlResultsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatIconModule,
    MatCheckboxModule,
    MatSelectModule,
    MatMenuModule,
    OverlayModule,
    FormsModule
  ],
  providers: [LoaderService, ResourceService, WikipediaService, SettingService, SparqlResultsService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptorService,
    multi: true
  }
  ],
  bootstrap: [AppComponent],
  entryComponents: [LoaderComponent]
})
export class AppModule { }
