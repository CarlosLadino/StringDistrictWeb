import { IVW_Frequencies, VW_Frequencies } from "../models/vwFrequencies";

export interface IFretboardSlotInformation {
  xPosition: number;
  yPosition: number;
  fretWidth: number;
  fretHeigth: number;
  class: string;
  stringGauge: number;
  hasMarker: boolean;
  NoteInformation: IVW_Frequencies;

}

export class FretboardSlotInformation implements IFretboardSlotInformation {
  public xPosition: number = 0;
  public yPosition: number = 0;
  public fretWidth: number = 0;
  public fretHeigth: number = 0;
  public class: string = '';
  public stringGauge: number = 0;
  public hasMarker: boolean = false;
  public NoteInformation = new VW_Frequencies(0, 0, 0, 0, null, false, null, 0);
  constructor() {
  }
}
