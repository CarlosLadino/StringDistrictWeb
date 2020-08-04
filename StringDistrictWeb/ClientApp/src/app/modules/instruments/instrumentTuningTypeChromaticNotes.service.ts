import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class InstrumentTuningTypeChromaticNotesService {
  public apiController = 'api/InstrumentTuningTypeChromaticNotes/';
  constructor(private httpClient: HttpClient) {

  }

  public getInstrumentTuningTypeChromaticNotesByTuningId() {
    return this.httpClient.get(`${this.apiController}GetInstrumentTuningTypeChromaticNotesByTuningId`);
  }

}
