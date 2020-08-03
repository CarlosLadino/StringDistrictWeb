import { Component, OnInit } from '@angular/core';
import { FretboardData} from '../common/helperModels/fretBoardData';
import { IChromaticNotes } from '../common/models/chromaticNotes.model';
import { IDropDownItem } from '../common/helperModels/dropDownItem';
import { IStructures } from '../common/models/structures.model';
import { ChordResult } from '../common/helperModels/chordResult';

@Component({
  selector: 'fretBoard',
  templateUrl: './fretBoard.component.html',
})
export class FretBoardComponent {
  public title: string;
  public tuningName: string;
  public instrument: FretboardData;
  public chromaticNotes: IChromaticNotes[];
  //private d3 = d3;
  //public svg = d3.selectAll("#main")
  private transitionDuration: number = 800;
  private optionButtonRadius: number = 1;
  private currentChord: ChordResult;
  private scalePositions: Object = {};
  private noteCirleStroke = '#939598';
  private noteCircleFill = '#fff';
  private fretboardFinalHeight: number = 0;
  public structureTypes: IDropDownItem[];
  public selectedStructureType: IDropDownItem
  public structureGroup: number;
  public structureLabel: string;
  public structure: IStructures;
  private instrumentSound; any;
  constructor() {

  }
  ngOnInit() {
  
  }

}
