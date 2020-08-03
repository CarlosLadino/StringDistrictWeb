export interface ISignature {
  Name: string;
  Color: string;
}

export class Signature implements ISignature {
  constructor(public Name: string,
    public Color: string) {
  }
}
