import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class TuningTypeNotesService {
  public apiController = 'api/TuningTypeNotes/';
  constructor(private httpClient: HttpClient) {

  }

  public getTunings() {
    return this.httpClient.get(`${this.apiController}GetTunings`);
  }

  public getTuningNotes() {
    return this.httpClient.get(`${this.apiController}GetTuningNotes`);
  }

  public getTuningByInstrument() {
    return this.httpClient.get(`${this.apiController}GetTuningByInstrument`);
  }

}
