import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class NoteFrequenciesService {
  public apiController = 'api/NoteFrequencies/';
  constructor(private httpClient: HttpClient) {

  }

  public getNoteFrequenciesView() {
    return this.httpClient.get(`${this.apiController}GetNoteFrequenciesView`);
  }

}
