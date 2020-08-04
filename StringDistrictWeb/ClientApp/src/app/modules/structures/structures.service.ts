import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class StructuresSrvice {
  public apiController = 'api/Structures/';
  constructor(private httpClient: HttpClient) {

  }

  public getChordTypes() {
    return this.httpClient.get(`${this.apiController}GetChordTypes`);
  }

  public getScaleTypes() {
    return this.httpClient.get(`${this.apiController}GetScaleTypes`);
  }

  public getStructure() {
    return this.httpClient.get(`${this.apiController}GetStructure`);
  }

  public getStructureTypes() {
    return this.httpClient.get(`${this.apiController}GetStructureTypes`);
  }

  public getScale() {
    return this.httpClient.get(`${this.apiController}GetScale`);
  }

}
