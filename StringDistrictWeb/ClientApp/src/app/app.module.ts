import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { FilterPipe } from './common/pipes/transforms.pipe';
import { FretBoardComponent } from './fretBoards/fretBoard.component';
import { APP_BASE_HREF } from '@angular/common';
import { StartupService } from './common/generalSevices/startup.service';
import { IInstrumentTuningTypeChromaticNotes } from './common/models/instrumentTuningTypeChromaticNotes.model';
import { InstrumentTuningTypeChromaticNotesService } from './modules/instruments/instrumentTuningTypeChromaticNotes.service';

//Resolvers
@Injectable({
  providedIn: 'root',
})
export class InstrumentTuningTypeChromaticNotesByTuningIdResolver implements Resolve<any> {
  constructor(private ittcnsService: InstrumentTuningTypeChromaticNotesService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    let tuningTypeId = Number(route.params['tuningTypeId']);
    return this.ittcnsService.getInstrumentTuningTypeChromaticNotesByTuningId(tuningTypeId);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    FilterPipe,
    FretBoardComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'fretBoard/:instrumentId/:tuningTypeId', component: FretBoardComponent, resolve: { ittcns: InstrumentTuningTypeChromaticNotesByTuningIdResolver } },
      { path: 'fetch-data', component: FetchDataComponent },
    ]),
    NgbModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: APP_INITIALIZER, useFactory: (startupService: StartupService) => () => startupService.initialLoad(), deps: [StartupService], multi: true }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }


