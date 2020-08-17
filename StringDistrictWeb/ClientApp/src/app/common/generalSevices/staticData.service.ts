import { Injectable } from '@angular/core';
import { IChordNote } from '../helperModels/chordNote';
import { IFretboard, Fretboard } from '../helperModels/fretBoard';
import { ITuningTypes } from '../models/tuningTypes.model';
import { StartupService } from './startup.service';
import { IInstrumentTuningTypeChromaticNotes } from '../models/instrumentTuningTypeChromaticNotes.model';
import { IInstruments } from '../models/instruments.model';
import { IChromaticNotes } from '../models/chromaticNotes.model';
import { IStructures } from '../models/structures.model';
import { IStructureTypes } from '../models/structureTypes.model';
import { IFretboardData, FretboardData } from '../helperModels/fretBoardData';
import { IVW_Frequencies } from '../models/vwFrequencies';
import { IFretboardStringRow, FretboardStringRow } from '../helperModels/fretBoardStringRow';
import { FretNumber } from '../helperModels/fretNumber';
import { FretboardSlotInformation, IFretboardSlotInformation } from '../helperModels/fretBoardSlotInformation';


@Injectable({
  providedIn: 'root',
})

export class StaticDataService {
  private chords: Array<IChordNote> = [];

  public constructor(private startupService: StartupService) {

  }

  public getFretboard(tuningTypeId: number): IFretboard {

    let tuningType = this.getTuningType(tuningTypeId);
    let tuning = this.getTuning(tuningTypeId);
    let instrument = this.getInstrument(tuningType.instrumentId);
    let runningNoteNumber: number;
    let name: string;
    ////let note: app.model.IFretboardNote;
    let chromaticnote: IChromaticNotes;
    let stringNumber: number;
    let fretboard: IFretboard;

    fretboard = new Fretboard(tuningType.instrumentId, tuningTypeId, instrument.name, false, true);

    for (let q = 0; q < tuning.length; q++) {
      let stringName = "String" + tuning[q].stringNumber;
      fretboard.stringGauges[stringName] = tuning[q].stringGauge;
    }

    return fretboard;
  }

  public getTuningType(id: number): ITuningTypes {
    let tuningType = this.startupService.tuningTypes.filter(function (tt): boolean {
      return tt.id == id;
    });
    return tuningType[0];
  }

  public getTuning(tuningTypeId: number): Array<IInstrumentTuningTypeChromaticNotes> {
    let tuning = this.startupService.tunings.filter(function (i): boolean {
      return i.tuningTypeId == tuningTypeId;
    });
    return tuning;
  }

  public getInstrument(id: number): IInstruments {
    let instrument = this.startupService.instruments.filter(function (i): boolean {
      return i.id == id;
    });
    return instrument[0];
  }

  public getMajorScale(chromaticNoteId: number): Array<number> {
    // Based on Scale Creation Formula W W H W W W H
    let scale = [0, 0, 0, 0, 0, 0, 0, 0];
    scale[0] = chromaticNoteId;
    scale[1] = scale[0] + 2 == 12 ? 12 : (scale[0] + 2) % 12; //Whole
    scale[2] = scale[1] + 2 == 12 ? 12 : (scale[1] + 2) % 12; //Whole
    scale[3] = scale[2] + 1 == 12 ? 12 : (scale[2] + 1) % 12; //Half
    scale[4] = scale[3] + 2 == 12 ? 12 : (scale[3] + 2) % 12; //Whole
    scale[5] = scale[4] + 2 == 12 ? 12 : (scale[4] + 2) % 12; //Whole
    scale[6] = scale[5] + 2 == 12 ? 12 : (scale[5] + 2) % 12; //Whole
    scale[7] = scale[6] + 1 == 12 ? 12 : (scale[6] + 1) % 12; //Half
    return scale;
  }

  public getChromaticNote(id: number): IChromaticNotes {
    let note = this.startupService.chromaticNotes.filter(function (cn): boolean {
      return cn.id == id;
    });
    return note[0];
  }

  public getChromaticNotes(): IChromaticNotes[] {
    return this.startupService.chromaticNotes;
  }

  public getInstruments(): IInstruments[] {
    return this.startupService.instruments;
  }

  public getTuningTypes(): ITuningTypes[] {
    return this.startupService.tuningTypes;
  }

  public getStructureTypes(): IStructureTypes[] {
    return this.startupService.structureTypes;
  }

  public getStructureType(id: number): IStructureTypes {
    let structureType = this.startupService.structureTypes.filter(function (st): boolean {
      return st.id == id;
    });
    return structureType[0];
  } 

  public generateFretBoardData(instrumentId: number, tuningTypeId: number, availableWidth: number, fretNumbersAreaHeight: number, stringNumbersAreaWidth: number, ittcns: IInstrumentTuningTypeChromaticNotes[]): IFretboardData {
    var instrument = this.getInstrument(instrumentId);
    var tuningNotes = this.getTuning(tuningTypeId);
    var fretBoardData = new FretboardData();
    fretBoardData.instrumentId = instrumentId;
    var firstFretWidth = this.calculateFirstFret(availableWidth, instrument.fretsNumber + 1, stringNumbersAreaWidth); // +1 accounts for the open string
    var fretHeigth = firstFretWidth / 2;

    fretBoardData.stringNumbers = this.generateStringNumbers(instrument.numberOfStrings);

    fretBoardData.fretboardStringRows = this.generateFretboardStringRows(instrument.numberOfStrings, instrument.fretsNumber);

    //Add note information to the model based on selected tuning.
    this.fillNoteInfo(fretBoardData, ittcns);

    // Fill Slot information
    this.fillFretSlotInformation(fretBoardData, firstFretWidth, fretHeigth, fretNumbersAreaHeight, stringNumbersAreaWidth, ittcns);

    fretBoardData.fretNumbers = this.generateFretNumbers(instrument, fretBoardData.fretboardStringRows[0]);

    // Fill TuningNotes
    this.fillFretboardNotes(fretBoardData, tuningTypeId);

    return fretBoardData;
  }

  public getNoteFrequencies(): IVW_Frequencies[] {
    return this.startupService.noteFrequencies;
  }

  public getMarkers(instrumentId: number) {
    return this.getInstrument(instrumentId).markers.split(',');
  }

  //Private Functions
  private generateStringNumbers(numberOfStrings: number) {
    var stringNumbers = new Array<string>();
    for (var i = 0; i < numberOfStrings; i++) {
      stringNumbers.push(String(i + 1));
    }
    return stringNumbers;
  }

  private generateFretNumbers(instrument: IInstruments, stringRow: IFretboardStringRow) {
    var fretNumbers = new Array<FretNumber>();
    var isStick = instrument.name.indexOf('Stick') >= 0;
    for (var i = 0; i < instrument.fretsNumber + 1; i++) {
      var fretNumber = new FretNumber();
      if (i == 0) {
        fretNumber.Name = '';
      } else {
        if (isStick) {
          if (i == 1) {
            fretNumber.Name = 'X';
          } else {
            fretNumber.Name = String(i - 1);
          }
        } else {
          fretNumber.Name = i.toString();
        }
      }

      fretNumber.xPosition = stringRow.fretboardSlots[i].xPosition;
      fretNumber.yPosition = stringRow.fretboardSlots[i].yPosition;

      fretNumbers.push(fretNumber);
    }
    return fretNumbers;
  }

  private generateFretboardStringRows(numberOfStrings: number, numberOfFrets: number) {
    var stringRows = new Array<FretboardStringRow>();
    for (var i = 0; i < numberOfStrings; i++) {
      var stringRow = new FretboardStringRow();
      for (var k = 0; k <= numberOfFrets; k++) {
        var fretSlot = new FretboardSlotInformation();
        stringRow.fretboardSlots.push(fretSlot);
      }
      stringRows.push(stringRow);
    }
    return stringRows;
  }

  private fillFretSlotInformation(fretboardData: FretboardData, firstFretWidth: number, fretHeigth: number, fretNumbersAreaHeight: number, stringNumbersAreaWidth: number, ittcns: IInstrumentTuningTypeChromaticNotes[]) {
    var tempPosition = stringNumbersAreaWidth;
    var markers = this.getMarkers(fretboardData.instrumentId);
    fretboardData.fretboardStringRows.forEach((rowValue: IFretboardStringRow, rowIndex: number) => {
      rowValue.fretboardSlots.forEach((slotValue: IFretboardSlotInformation, slotIndex: number) => {
        slotValue.xPosition = tempPosition;
        tempPosition = tempPosition + firstFretWidth - slotIndex + 1;
        slotValue.yPosition = rowIndex * fretHeigth + fretNumbersAreaHeight;
        slotValue.fretWidth = firstFretWidth - slotIndex;
        slotValue.fretHeigth = fretHeigth + 1; // the 1 compensates for a gap in the svg
        slotValue.class = slotIndex == 0 ? "" : "cls-1";

        //Fill String Gauge
        var gauge = ittcns.filter((ittcn: IInstrumentTuningTypeChromaticNotes) => {
          return ittcn.stringNumber == rowIndex + 1;
        });
        slotValue.stringGauge = gauge[0].stringGauge;
        //Markers
        slotValue.hasMarker = markers.indexOf((slotIndex).toString()) >= 0;
      });
      tempPosition = stringNumbersAreaWidth;
    });
  }

  private fillFretboardNotes(fretboardData: FretboardData, tuningTypeId: number) {
    var tuning = this.getTuning(tuningTypeId);
  }

  private calculateFirstFret(width: number, numberOfSegments: number, stringNumbersAreaWidth: number) {
    return Math.floor(((width - stringNumbersAreaWidth) / numberOfSegments + (numberOfSegments - 1) / 2));
  }

  private fillNoteInfo(fretboardData: FretboardData, ittcns: IInstrumentTuningTypeChromaticNotes[]) {
    var frequencies = this.getNoteFrequencies();

    ittcns.forEach((rowIttcnValue: IInstrumentTuningTypeChromaticNotes, rowIttcnIndex: number) => {
      var row: IFretboardStringRow = fretboardData.fretboardStringRows[rowIttcnValue.stringNumber - 1];
      var initialNoteIndex = this.arrayObjectIndexOf(frequencies, rowIttcnValue.noteFrequencyId, "Id");
      for (var index = rowIttcnValue.startAtFretNumber; index < row.fretboardSlots.length; index++) {
        row.fretboardSlots[index].NoteInformation = frequencies[initialNoteIndex + index];
      }
    });
  }

  private arrayObjectIndexOf(myArray, searchTerm, property) {

    for (var i = 0, len = myArray.length; i < len; i++) {
      if (myArray[i][property] === searchTerm) return i;
    }
    return -1;
  }
}
