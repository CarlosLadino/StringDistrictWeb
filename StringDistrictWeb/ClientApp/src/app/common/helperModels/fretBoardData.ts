import { FretNumber, IFretNumber } from "./fretNumber";
import { IFretboardStringRow } from "./fretBoardStringRow";

export interface IFretboardData {
  instrumentId: number;
  fretNumbers: IFretNumber[];
  stringNumbers: string[];
  fretboardStringRows: IFretboardStringRow[];
}

export class FretboardData implements IFretboardData {
  public instrumentId: number;
  public fretNumbers: FretNumber[] = new Array<FretNumber>();
  public stringNumbers: string[] = new Array<string>();
  public fretboardStringRows: IFretboardStringRow[] = new Array<IFretboardStringRow>();
  constructor() {
  }
}
