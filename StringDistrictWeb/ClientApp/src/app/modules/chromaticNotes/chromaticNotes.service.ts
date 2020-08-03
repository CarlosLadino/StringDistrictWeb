import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class ChromaticNotesService {
  public apiController = 'api/ChromaticNotes/';
  constructor(private httpClient: HttpClient) {

  }

  public getChromaticNotes() {
    return this.httpClient.get(`${this.apiController}GetChromaticNotes`);
  }

}
