import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IInstruments } from '../../common/models/instruments.model';

@Injectable({
  providedIn: 'root',
})

export class InstrumentService {
  public apiController = 'api/Instrument/';
  constructor(private httpClient: HttpClient) {

  }

  public getEvents() {
    return this.httpClient.get(`${this.apiController}GetInstruments`);
  }

}
