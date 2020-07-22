import { Component, OnInit } from '@angular/core';
import { InstrumentService } from '../modules/instruments/instrument.service';
import { IInstruments } from '../common/models/instruments.model';
import { TuningTypesService } from '../modules/tuningTypes.service.ts/tuningTypes.service';
import { ITuningTypes } from '../common/models/tuningTypes.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public instruments: IInstruments[];
  public tuningTypes: ITuningTypes[];
  constructor(private instrumentService: InstrumentService, private tuningTypesManager: TuningTypesService) {

  }
  ngOnInit() {
    this.instrumentService.getIntruments().subscribe((data: IInstruments[]) => {
      this.instruments = data;
    });

    this.tuningTypesManager.getTuningTypes().subscribe((data: ITuningTypes[]) => {
      this.tuningTypes = data;
    });
  }

}
