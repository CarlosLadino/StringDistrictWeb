import { Injectable } from '@angular/core';
import { IChordNote } from '../helperModels/chordNote';
import { IFretboard, Fretboard } from '../helperModels/fretBoard';
import { ITuningTypes } from '../models/tuningTypes.model';
import { StartupService } from './startup.service';
import { IInstrumentTuningTypeChromaticNotes } from '../models/instrumentTuningTypeChromaticNotes.model';
import { IInstruments } from '../models/instruments.model';
import { IChromaticNotes } from '../models/chromaticNotes.model';


@Injectable({
  providedIn: 'root',
})

export class StaticDataService {
  private chords: Array<IChordNote> = [];

  public constructor(private startupService: StartupService) {

  }

  public getFretboard(tuningTypeId: number): IFretboard {

    let tuningType = this.getTuningType(tuningTypeId);
    let tuning = this.getTuning(tuningTypeId);
    let instrument = this.getInstrument(tuningType.instrumentId);
    let runningNoteNumber: number;
    let name: string;
    ////let note: app.model.IFretboardNote;
    let chromaticnote: IChromaticNotes;
    let stringNumber: number;
    let fretboard: IFretboard;

    fretboard = new Fretboard(tuningType.instrumentId, tuningTypeId, instrument.name, false, true);

    for (let q = 0; q < tuning.length; q++) {
      let stringName = "String" + tuning[q].stringNumber;
      fretboard.stringGauges[stringName] = tuning[q].stringGauge;
    }

    return fretboard;
  }

  public getTuningType(id: number): ITuningTypes {
    let tuningType = this.startupService.tuningTypes.filter(function (tt): boolean {
      return tt.id == id;
    });
    return tuningType[0];
  }

  public getTuning(tuningTypeId: number): Array<IInstrumentTuningTypeChromaticNotes> {
    let tuning = this.startupService.tunings.filter(function (i): boolean {
      return i.tuningTypeId == tuningTypeId;
    });
    return tuning;
  }

  public getInstrument(id: number): IInstruments {
    let instrument = this.startupService.instruments.filter(function (i): boolean {
      return i.id == id;
    });
    return instrument[0];
  }
}
