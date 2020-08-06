import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IInstruments } from '../models/instruments.model';
import { InstrumentService } from '../../modules/instruments/instrument.service';
import { ITuningTypes } from '../models/tuningTypes.model';
import { TuningTypesService } from '../../modules/tuningTypes/tuningTypes.service';
import { ChromaticNotesService } from '../../modules/chromaticNotes/chromaticNotes.service';
import { IChromaticNotes } from '../models/chromaticNotes.model';
import { TuningTypeNotesService } from '../../modules/tuningTypes/tuningTypeNotes.service';
import { IInstrumentTuningTypeChromaticNotes } from '../models/instrumentTuningTypeChromaticNotes.model';
import { INoteFrequencies } from '../models/noteFrequencies.model';
import { NoteFrequenciesService } from '../../modules/noteFrequencies/noteFrequencies.service';
import { IVW_Frequencies } from '../models/vwFrequencies';
import { StructuresService } from '../../modules/structures/structures.service';
import { IStructureTypes } from '../models/structureTypes.model';

@Injectable({
  providedIn: 'root',
})

export class StartupService {
  public apiController = 'api/Instruments/';
  public instruments: IInstruments[];
  public tuningTypes: ITuningTypes[];
  public chromaticNotes: IChromaticNotes[];
  public tunings: IInstrumentTuningTypeChromaticNotes[];
  public noteFrequencies: IVW_Frequencies[];
  public structureTypes: IStructureTypes[];

  constructor(private instrumentService: InstrumentService, private tuningTypesService: TuningTypesService, private chromaticNotesService: ChromaticNotesService, private tuningTypeNotesService: TuningTypeNotesService, private noteFrequenciesService: NoteFrequenciesService, private structuresService: StructuresService) {

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
      }),
      this.tuningTypeNotesService.getTunings().toPromise().then((results: IInstrumentTuningTypeChromaticNotes[]) => {
        this.tunings = results;
      }),
      this.noteFrequenciesService.getNoteFrequenciesView().toPromise().then((results: IVW_Frequencies[]) => {
        this.noteFrequencies = results;
      }),
      this.structuresService.getStructureTypes().toPromise().then((results: IStructureTypes[]) => {
        this.structureTypes = results;
      })
    ]);
  }
}
