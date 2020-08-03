export interface IVW_Frequencies {
  Id: number;
  Frequency: number;
  LevelId: number;
  ChromaticNoteId: number;
  Name: string;
  IsAccidental: boolean;
  BemolName: string;
  LevelNumber: number;
}

export class VW_Frequencies implements IVW_Frequencies {
  constructor(
    public Id: number,
    public Frequency: number,
    public LevelId: number,
    public ChromaticNoteId: number,
    public Name: string,
    public IsAccidental: boolean,
    public BemolName: string,
    public LevelNumber: number
  ) { }
}
