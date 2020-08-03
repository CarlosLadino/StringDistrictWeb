import { IStructureKeys } from "../models/structureKeys.model";

export interface IChordResult {
  Name: string;
  Signature: string;
  ChordNotes: Array<IStructureKeys>;
}

export class ChordResult implements IChordResult {
  public ChordNotes: Array<IStructureKeys>
  constructor(
    public Name: string,
    public Signature: string) {
    this.ChordNotes = [];
  }
}
