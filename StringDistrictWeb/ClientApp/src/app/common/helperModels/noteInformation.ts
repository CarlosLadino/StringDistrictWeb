export interface INoteInformation {
  Name: string;
  BemolName: string;
  IsAccidental: boolean;
  Level: string;
}

export class NoteInformation implements INoteInformation {
  constructor(public Name: string,
    public BemolName: string,
    public IsAccidental: boolean,
    public Level: string) {
  }
}
