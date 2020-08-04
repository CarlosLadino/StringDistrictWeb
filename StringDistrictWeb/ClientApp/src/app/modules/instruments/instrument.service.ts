import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IInstruments } from '../../common/models/instruments.model';

@Injectable({
  providedIn: 'root',
})

export class InstrumentService {
  public apiController = 'api/Instruments/';
  constructor(private httpClient: HttpClient) {

  }

  public getIntruments() {
    return this.httpClient.get(`${this.apiController}GetInstruments`);
  }

  public getInstrumentById() {
    return this.httpClient.get(`${this.apiController}GetInstrumentById`);
  }
}
