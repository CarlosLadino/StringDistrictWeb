export interface IDropDownItem {
  Id: number;
  Name: string;
  GroupId: number;
}

export class DropDownItem implements IDropDownItem {
  constructor(public Id: number,
    public Name: string,
    public GroupId: number
  ) {
  }
}
