import { IFretboardSlotInformation } from "./fretBoardSlotInformation";

export interface IFretboardStringRow {
  fretboardSlots: IFretboardSlotInformation[];
}

export class FretboardStringRow implements IFretboardStringRow {
  public fretboardSlots: IFretboardSlotInformation[] = new Array<IFretboardSlotInformation>();
  constructor() {
  }
}
