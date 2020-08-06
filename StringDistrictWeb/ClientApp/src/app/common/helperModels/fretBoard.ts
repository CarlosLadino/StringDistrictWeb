export interface IFretboard {
  isntrumentId: number;
  tuningId: number;
  name: string;
  notes: Object;
  stringGauges: Object;
  isDotInlayVisible: boolean;
  isLinearInlayVisible: boolean;

}

export class Fretboard implements IFretboard {
  public notes: Object;
  public stringGauges: Object;
  constructor(
    public isntrumentId: number,
    public tuningId: number,
    public name: string,
    public isDotInlayVisible: boolean,
    public isLinearInlayVisible: boolean) {
    this.stringGauges = new Object;
    this.notes = new Object;
  }
}
