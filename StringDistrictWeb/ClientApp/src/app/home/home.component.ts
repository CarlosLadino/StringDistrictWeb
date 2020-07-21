import { Component, OnInit } from '@angular/core';
import { InstrumentService } from '../modules/instruments/instrument.service';
import { IInstruments } from '../common/models/instruments.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public instrments: IInstruments[];
  constructor(private instrumentService: InstrumentService) {

  }
  ngOnInit() {
    this.instrumentService.getEvents().subscribe((data: IInstruments[]) => {
      this.instrments = data;
    });
  }
  
}
