import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IInstruments } from '../models/instruments.model';
import { InstrumentService } from '../../modules/instruments/instrument.service';
import { ITuningTypes } from '../models/tuningTypes.model';
import { TuningTypesService } from '../../modules/tuningTypes/tuningTypes.service';
import { ChromaticNotesService } from '../../modules/chromaticNotes/chromaticNotes.service';
import { IChromaticNotes } from '../models/chromaticNotes.model';

@Injectable({
  providedIn: 'root',
})

export class StartupService {
  public apiController = 'api/Instruments/';
  public instruments: IInstruments[];
  public tuningTypes: ITuningTypes[];
  public chromaticNotes: IChromaticNotes[];

  constructor(private instrumentService: InstrumentService, private tuningTypesService: TuningTypesService, private chromaticNotesService: ChromaticNotesService) {

  }

  public initialLoad() {
    return Promise.all([
      this.instrumentService.getIntruments().toPromise().then((result: IInstruments[]) => {
        this.instruments = result;
      }),
      this.tuningTypesService.getTuningTypes().toPromise().then((result: ITuningTypes[]) => {
        this.tuningTypes = result;
      }),
      this.chromaticNotesService.getChromaticNotes().toPromise().then((result: IChromaticNotes[]) => {
        this.chromaticNotes = result;
      })
    ]);
  }
}
