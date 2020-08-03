export interface IFretNumber {
  Name: string;
  xPosition: number;
  yPosition: number;
}

export class FretNumber implements IFretNumber {
  public Name: string;
  public xPosition: number;
  public yPosition: number;
  constructor() {
  }
}
