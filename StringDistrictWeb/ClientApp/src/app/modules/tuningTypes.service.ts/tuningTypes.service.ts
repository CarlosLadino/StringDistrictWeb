import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IInstruments } from '../../common/models/instruments.model';

@Injectable({
  providedIn: 'root',
})

export class TuningTypesService {
  public apiController = 'api/TuningTypes/';
  constructor(private httpClient: HttpClient) {

  }

  public getTuningTypes() {
    return this.httpClient.get(`${this.apiController}GetTuningTypes`);
  }

}
