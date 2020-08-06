export interface IChordNote {
  Id: number;
  ChordId: number;
  ChromaticNoteId: number;
  NoteColor: string;
}

export class ChordNote implements IChordNote {
  constructor(public Id: number,
    public ChordId: number,
    public ChromaticNoteId: number,
    public NoteColor: string) {
  }
}
