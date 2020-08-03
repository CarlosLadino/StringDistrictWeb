import { Component, OnInit } from '@angular/core';
import { InstrumentService } from '../modules/instruments/instrument.service';
import { IInstruments } from '../common/models/instruments.model';
import { TuningTypesService } from '../modules/tuningTypes.service.ts/tuningTypes.service';
import { ITuningTypes } from '../common/models/tuningTypes.model';
import { StartupService } from '../common/generalSevices/startup.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public instruments: IInstruments[];
  public tuningTypes: ITuningTypes[];
  constructor(private startupService: StartupService) {

  }
  ngOnInit() {
    this.instruments = this.startupService.instruments;
    this.tuningTypes = this.startupService.tuningTypes;
  }

}
