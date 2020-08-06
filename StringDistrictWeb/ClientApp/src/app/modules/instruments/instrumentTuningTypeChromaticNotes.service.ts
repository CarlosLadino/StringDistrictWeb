import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class InstrumentTuningTypeChromaticNotesService {
  public apiController = 'api/InstrumentTuningTypeChromaticNotes/';
  constructor(private httpClient: HttpClient) {

  }

  public getInstrumentTuningTypeChromaticNotes() {
    return this.httpClient.get(`${this.apiController}GetInstrumentTuningTypeChromaticNotes`);
  }

  public getInstrumentTuningTypeChromaticNotesByTuningId(tuningTypeId: number) {
    return this.httpClient.get(`${this.apiController}GetInstrumentTuningTypeChromaticNotesByTuningId/${tuningTypeId}`);
  }

}
