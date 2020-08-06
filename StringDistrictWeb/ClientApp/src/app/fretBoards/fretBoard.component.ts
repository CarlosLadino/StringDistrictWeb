import { Component, OnInit } from '@angular/core';
import { FretboardData} from '../common/helperModels/fretBoardData';
import { IChromaticNotes } from '../common/models/chromaticNotes.model';
import { IDropDownItem } from '../common/helperModels/dropDownItem';
import { IStructures } from '../common/models/structures.model';
import { ChordResult } from '../common/helperModels/chordResult';
import { StructuresService } from '../modules/structures/structures.service';
import { StaticDataService } from '../common/generalSevices/staticData.service';
import { Route, ActivatedRoute } from '@angular/router';
import { IInstrumentTuningTypeChromaticNotes } from '../common/models/instrumentTuningTypeChromaticNotes.model';

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
  private instrumentId: number;
  private tuningTypeId: number;
  private ittcns: IInstrumentTuningTypeChromaticNotes[];

  constructor(private structuresService: StructuresService, private staticDataService: StaticDataService, private route: ActivatedRoute) {

  }
  ngOnInit() {
    this.structuresService.getStructureTypes().subscribe((result: IDropDownItem[]) => {
      this.structureTypes = result;
      this.selectedStructureType = this.structureTypes[0];
    });

    this.ittcns = this.route.snapshot.data['ittcns'];

    this.route.params.subscribe(params => {
      this.instrumentId = Number(params['instrumentId']);
      this.tuningTypeId = Number(params['tuningTypeId']);
    });
    this.title = this.staticDataService.getInstrument(this.instrumentId).name;
    this.tuningName = this.staticDataService.getTuningType(this.tuningTypeId).name;
    var availableWidth = 980; //replace width window width           
    var fretBar = 8;
    var fretNumbersAreaHeight = 25;
    var stringNumbersAreaWidth = 25;
    var instrumentTotalHeight = fretNumbersAreaHeight * this.ittcns.length;
  }

}
