import { IStructureKeys } from "./structureKeys.model";

export interface IStructures {
  id: number;
  structureTypeId: number;
  name: string;
  isArchived: boolean;
  orderNumber: number;
  signature: string;
  structureKeys: Array<IStructureKeys>;
}

export class Structure implements IStructures {
  public structureKeys: Array<IStructureKeys>;
  constructor(public id: number,
    public structureTypeId: number,
    public name: string,
    public isArchived: boolean,
    public orderNumber: number,
    public signature: string
  ) {
    this.structureKeys = [];
  }
}
