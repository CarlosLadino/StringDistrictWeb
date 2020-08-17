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
import { IFretNumber } from '../common/helperModels/fretNumber';
import { IFretboardStringRow } from '../common/helperModels/fretBoardStringRow';
import { IFretboardSlotInformation } from '../common/helperModels/fretBoardSlotInformation';
import { StructureType, NotesColors } from '../common/enumerations';
import { Signature } from '../common/helperModels/signature';
import { VW_Frequencies } from '../common/models/vwFrequencies';
import * as d3 from "d3";

@Component({
  selector: 'fretBoard',
  templateUrl: './fretBoard.component.html',
})
export class FretBoardComponent {
  public title: string;
  public tuningName: string;
  public instrument: FretboardData;
  public chromaticNotes: IChromaticNotes[];
  private d3 = d3;
  public svg = d3.selectAll("#main")
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

    // Gather Data
    this.chromaticNotes = this.staticDataService.getChromaticNotes();
    this.instrument = this.staticDataService.generateFretBoardData(this.instrumentId, this.tuningTypeId, availableWidth, fretNumbersAreaHeight, stringNumbersAreaWidth, this.ittcns);

    this.fretboardFinalHeight = this.instrument.fretboardStringRows[this.instrument.fretboardStringRows.length - 1].fretboardSlots[0].yPosition;

    //Adding the fret numbers
    var fretNumbersGroup = this.svg.append('g').attr('id', 'fretNumbersGroup' + this.instrumentId);
    var fretNumbers = fretNumbersGroup.selectAll('g')
      .data(this.instrument.fretNumbers)
      .enter().append('g').attr("transform", function (d: IFretNumber, i: number) { return "translate(" + d.xPosition + "," + 0 + ")"; })
      .append('text').attr('class', 'cls-5').attr('x', 0).attr('y', 20)
      .text(function (d: IFretNumber, i: number) { return d.Name });

    //Adding the string numbers
    var stringNumbersGroup = this.svg.append('g').attr('id', 'stringNumbersGroup' + this.instrumentId);
    var stringNumbers = stringNumbersGroup.selectAll('g')
      .data(this.instrument.fretboardStringRows)
      .enter().append('g').attr("transform", function (d: IFretboardStringRow, i: number) { return "translate(" + 0 + "," + (d.fretboardSlots[0].yPosition) + ")"; })
      .append('text').attr('class', 'cls-5').attr('x', 0).attr('y', 20)
      .text(function (d: IFretboardStringRow, i: number) { return i + 1 });

    //Adding the fretboard
    this.instrument.fretboardStringRows.forEach((stringRow: IFretboardStringRow, rowIndex: number) => {
      var group = this.svg.append('g').attr('class', 'group' + rowIndex.toString());

      var node = group.selectAll('g')
        .data(stringRow.fretboardSlots)
        .enter().append('g')
        .attr("transform", function (d: IFretboardSlotInformation, i: number) { return "translate(" + d.xPosition + "," + d.yPosition + ")"; })
        .attr('class', function (d: IFretboardSlotInformation, i: number) { return 'FretGroup FretGroup_' + d.NoteInformation.ChromaticNoteId.toString(); });

      // Slot body
      node.append('rect')
        .attr('class', function (d: IFretboardSlotInformation, i: number) { return d.class })
        .attr('width', function (d: IFretboardSlotInformation, i: number) { return d.fretWidth })
        .attr('height', function (d: IFretboardSlotInformation, i: number) { return d.fretHeigth });
      // Fret
      node.append('rect').attr('class', 'cls-2')
        .attr('x', function (d: IFretboardSlotInformation, i: number) { return d.fretWidth - fretBar })
        .attr('width', fretBar)
        .attr('height', function (d: IFretboardSlotInformation, i: number) { return d.fretHeigth });
      // Markers
      node.append('rect').attr('class', 'cls-6')
        .attr('x', function (d: IFretboardSlotInformation, i: number) { return d.fretWidth - (2 * fretBar) })
        .attr('width', fretBar)
        .attr('height', function (d: IFretboardSlotInformation, i: number) { return d.fretHeigth })
        .attr('opacity', function (d: IFretboardSlotInformation, i: number) { return d.hasMarker ? 1 : 0 });
      // String
      node.append('line').attr('class', 'cls-3')
        .attr('y1', function (d: IFretboardSlotInformation, i: number) { return d.fretHeigth / 2 })
        .attr('x2', function (d: IFretboardSlotInformation, i: number) { return d.fretWidth })
        .attr('y2', function (d: IFretboardSlotInformation, i: number) { return d.fretHeigth / 2 })
        .attr('stroke-width', function (d: IFretboardSlotInformation, i: number) { return d.stringGauge });
      // Note Circle
      var noteNode = node.append('g')
        .attr('class', function (d: IFretboardSlotInformation, i: number) { return 'NoteGroup NoteGroup_' + d.NoteInformation.ChromaticNoteId.toString() + ' ' + (d.NoteInformation.IsAccidental ? 'Accidental' : 'Diatonic'); })
        .attr('opacity', 0);
      //////////////////this.generateNoteButtons(noteNode, fretBar);

      // Selection Board ----------------------------------------------------------------------------------------------
      var boxWidth = 39;
      var boxHeight = 20;
      var yChromaticNotes = this.fretboardFinalHeight + 40;

      // Chromatic Options
      var chromaticNotesGroup = this.svg.append('g').attr('id', 'ChromaticNotesGroup' + this.instrumentId);
      var chromaticNode = chromaticNotesGroup.selectAll('g')
        .data(this.chromaticNotes)
        .enter().append('g').attr("transform", function (d: IChromaticNotes, i: number) { return "translate(" + (stringNumbersAreaWidth + (i * 41)) + "," + (+ yChromaticNotes) + ")"; })
        .attr('id', function (d: IChromaticNotes, i: number) { return 'chromaticOption_' + d.id; })
        .on('click', (d: IChromaticNotes, i: number) => { return this.onChromaticNoteClick(d); });
      // Back Ground
      chromaticNode.append('rect')
        .attr('class', function (d: IChromaticNotes, i: number) { return 'chromaticButton cls-default-options optChromatic_' + d.id + ' ' + (d.isAccidental ? 'AccidentalButton' : 'DiatonicButton'); })
        .attr('width', boxWidth).attr('height', boxHeight).attr('rx', this.optionButtonRadius).attr('ry', this.optionButtonRadius);
      // Note Text
      chromaticNode.append('text')
        .attr('x', function (d: IChromaticNotes, i: number) { return d.isAccidental ? 5 : 16; })
        .attr('y', 14).attr('font-size', 10).attr('fill', '#fff')
        .text(function (d: IChromaticNotes, i: number) { return d.isAccidental ? d.name + '#/' + d.bemolName + 'b' : d.name; });

      // Group Note options
      var optionsGroup = this.svg.append('g').attr('id', 'OptionsGroup' + this.instrumentId)
        //.attr("transform", "translate(" + (((boxWidth + 1) * 12) + 50) + "," + (instrumentTotalHeight + yChromaticNotes) + ")") 
        .attr("transform", "translate(" + stringNumbersAreaWidth + "," + (yChromaticNotes + boxHeight + 3) + ")")
      ////////////////this.generateNoteOptionButons(optionsGroup, yChromaticNotes, boxWidth, boxHeight);

      // Group board Options
      var boardOptionsGroup = this.svg.append('g').attr('id', 'BoardOptionsGroup' + this.instrumentId)
        .attr("transform", "translate(" + 860 + "," + yChromaticNotes + ")")
      //////////////////this.generateBoardOptionButons(boardOptionsGroup, yChromaticNotes, boxWidth, boxHeight);

      this.svg.selectAll('text').style('pointer-events', 'none'); // Remove the text cursor when hovering over text

      //Group Signature
      var signatureGroup = this.svg.append('g').attr('id', 'SignatureBlock' + this.instrumentId).attr('opacity', 0);
      signatureGroup.append('text')
        .attr('x', 565)
        .attr('y', yChromaticNotes + 14).attr('font-size', 10).attr('fill', '#fff')
        .text('Signature:');
      signatureGroup.append('g').attr('id', 'SignatureGroup' + this.instrumentId)
        .attr("transform", "translate(" + 630 + "," + yChromaticNotes + ")")

    }); 

  }

  onChromaticNoteClick(note: IChromaticNotes) {
    if (this.structureGroup == StructureType.Chord || this.structureGroup == StructureType.Scale) {
      //Visuals
      this.svg.selectAll('.chromaticButton').classed('cls-default-options', true);
      this.svg.selectAll('.chromaticButton').classed('cls-pressed-options', false);
      //load structure
      ////////////////this.loadStructure(note.id);

      this.svg.selectAll('.optChromatic_' + note.id).classed('cls-pressed-options', true);
      this.svg.selectAll('.optChromatic_' + note.id).classed('cls-default-options', false);
    } else { //Notes
      var isPressed = this.svg.selectAll('.optChromatic_' + note.id).classed("cls-pressed-options");
      this.svg.selectAll('.NoteGroup_' + note.id).transition().duration(this.transitionDuration).attr('opacity', isPressed ? 0 : 1);
      this.svg.selectAll('.optChromatic_' + note.id).classed('cls-pressed-options', !isPressed);
      this.svg.selectAll('.optChromatic_' + note.id).classed('cls-default-options', isPressed);
    }
  }

  onChromaticsClick() {
    this.svg.selectAll('.NoteGroup').transition().duration(this.transitionDuration).attr('opacity', 1);
    this.svg.selectAll('.chromaticButton').classed('cls-pressed-options', true);
  }

  onClearAllClick() {
    ////////////////this.resetCriteria();
  }

  onDiatonicClick() {
    this.svg.selectAll('.Diatonic').transition().duration(this.transitionDuration).attr('opacity', 1);
    this.svg.selectAll('.DiatonicButton').classed('cls-pressed-options', true);
    this.svg.selectAll('.DiatonicButton').classed('cls-default-options', false);
  }

  onAccidentalClick() {
    this.svg.selectAll('.Accidental').transition().duration(this.transitionDuration).attr('opacity', 1);
    this.svg.selectAll('.AccidentalButton').classed('cls-pressed-options', true);
    this.svg.selectAll('.AccidentalButton').classed('cls-default-options', false);
  }

  onSharpClick() {
    this.svg.selectAll('.AccidentalNote.Note').transition().duration(this.transitionDuration).attr('opacity', 1);
    this.svg.selectAll('.Sharp').transition().duration(this.transitionDuration).attr('opacity', 1);
    this.svg.selectAll('.Bemol').transition().duration(this.transitionDuration).attr('opacity', 0);

    this.svg.selectAll('.allSharp').classed('cls-pressed-options', true);
    this.svg.selectAll('.allSharp').classed('cls-default-options', false);
    this.svg.selectAll('.allBemol').classed('cls-pressed-options', false);
    this.svg.selectAll('.allBemol').classed('cls-default-options', true);
  }

  onBemolClick() {
    this.svg.selectAll('.Sharp').transition().duration(this.transitionDuration).attr('opacity', 0);
    this.svg.selectAll('.AccidentalNote.Note').transition().duration(this.transitionDuration).attr('opacity', 0);
    this.svg.selectAll('.Bemol').transition().duration(this.transitionDuration).attr('opacity', 1);

    this.svg.selectAll('.allSharp').classed('cls-pressed-options', false);
    this.svg.selectAll('.allSharp').classed('cls-default-options', true);
    this.svg.selectAll('.allBemol').classed('cls-pressed-options', true);
    this.svg.selectAll('.allBemol').classed('cls-default-options', false);
  }

  onFretBoardOptionChanged(option: number): void {
    this.structureGroup = option;
    if (this.structureGroup == StructureType.Chord) {
      this.selectedStructureType = this.structureTypes[0];
    }
    else { // Scale
      //////////////////let scales = this.structureTypes.filter(this.firstScaleInStructure);
      this.selectedStructureType = scales[0];
    }

    this.structureLabel = option == StructureType.Chord ? "Chord Type" : "Scale Type";
    //////////this.$scope.$apply();
    //////////////this.resetCriteria();
    if (option == StructureType.Chord) {
      this.svg.selectAll('.optionsGroup').transition().duration(this.transitionDuration).attr('opacity', 0);
      this.svg.selectAll('.boardGroup').classed('cls-pressed-options', false);
      this.svg.selectAll('.boardGroup').classed('cls-default-options', true);
      this.svg.selectAll('.boardGroup2').classed('cls-pressed-options', true);
      this.svg.selectAll('.boardGroup2').classed('cls-default-options', false);
      this.onStructureTypeChanged();

    } else if (option == StructureType.Scale) {
      this.svg.selectAll('.optionsGroup').transition().duration(this.transitionDuration).attr('opacity', 0);
      this.svg.selectAll('.boardGroup').classed('cls-pressed-options', false);
      this.svg.selectAll('.boardGroup').classed('cls-default-options', true);
      this.svg.selectAll('.boardGroup1').classed('cls-pressed-options', true);
      this.svg.selectAll('.boardGroup1').classed('cls-default-options', false);
      this.onStructureTypeChanged();

    } else { // Notes
      this.svg.selectAll('.optionsGroup').transition().duration(this.transitionDuration).attr('opacity', 1);
      this.svg.selectAll('.boardGroup').classed('cls-pressed-options', false);
      this.svg.selectAll('.boardGroup').classed('cls-default-options', true);
      this.svg.selectAll('.boardGroup3').classed('cls-pressed-options', true);
      this.svg.selectAll('.boardGroup3').classed('cls-default-options', false);
    }

    this.svg.select('#SignatureBlock' + this.instrumentId).transition().duration(this.transitionDuration)
      .attr('opacity', option == StructureType.Chord || option == StructureType.Scale ? 1 : 0);
  }

  onStructureTypeChanged() {
    ////var signatureArray: Signature[] = new Array<Signature>();
    ////let structure = this.staticDataService.getStructureType(this.selectedStructureType.Id);
    ////for (let index = 0; index < structure.StructureKeys.length; index++) {
    ////  //After the end of the scale, it repeats ex. 1 =1 ... 7 = 7, 8 = 1, 9 = 2 ...   
    ////  let majorScaleTransformedPosition = structure.StructureKeys[index].ScalePosition == 7 ? 7 : structure.StructureKeys[index].ScalePosition % 7;
    ////  signatureArray.push(new app.domain.Signature(structure.StructureKeys[index].Signature, app.common.NotesColors[majorScaleTransformedPosition]));
    ////////}

    ////////this.svg.select('#SignatureBlock' + this.instrumentId).selectAll('circle').remove();
    ////////this.resetCriteria();
    ////////var signatureGroup = this.svg.select('#SignatureGroup' + this.instrumentId)

    ////////signatureGroup.selectAll('circle').remove();
    ////////var signature = signatureGroup.selectAll('g').data(signatureArray).enter()
    ////////signature.append('circle')
    ////////  .attr('cx', function (d: Signature, i: number) { return 26 * i; })
    ////////  .attr('cy', function (d: Signature, i: number) { return 10 })
    ////////  .attr('r', function (d: Signature, i: number) { return 12; })
    ////////  .attr('stroke', this.noteCirleStroke).attr('fill', function (d: Signature, i: number) { return d.Color; });
    ////////signature.append('text').attr('x', function (d: Signature, i: number) { return 26 * i - (d.Name.length == 1 ? 3 : d.Name.length == 2 ? 6 : 9); }).attr('y', function (d: Signature, i: number) { return 14; }).attr('font-size', 12)
    ////////  .text(function (d: Signature, i: number) { return d.Name; });
  }

  onNoteClick(note: VW_Frequencies) {
    var noteName = note.IsAccidental ? note.Name + '#' : note.Name;
    this.instrumentSound.play(noteName, note.LevelNumber, 2);
  }

  ////////////generateNoteButtons(group: d3.Selection<any>, fretBar: number) {
  ////////////  group.on('click', (d: IFretboardSlotInformation) => { return this.onNoteClick(d.NoteInformation); });
  ////////////  group.append('circle')
  ////////////    .attr('cx', function (d: IFretboardSlotInformation, i: number) { return ((d.fretWidth - fretBar) / 2) })
  ////////////    .attr('cy', function (d: IFretboardSlotInformation, i: number) { return d.fretHeigth / 2 })
  ////////////    .attr('r', function (d: IFretboardSlotInformation, i: number) { return d.fretHeigth / 2 - d.fretHeigth * 0.05 })
  ////////////    .attr('class', function (d: IFretboardSlotInformation, i: number) { return 'Circle Chromatic_' + d.NoteInformation.ChromaticNoteId.toString(); })
  ////////////    .attr('stroke', this.noteCirleStroke).attr('fill', this.noteCircleFill);
  ////////////  // Main Note Name
  ////////////  group.append('text').attr('x', function (d: IFretboardSlotInformation, i: number) { return ((d.fretWidth - fretBar) / 2) - 5 })
  ////////////    .attr('y', function (d: IFretboardSlotInformation, i: number) { return (d.fretHeigth / 2) + 5 })
  ////////////    .text(function (d: IFretboardSlotInformation, i: number) { return d.NoteInformation.Name })
  ////////////    .attr('class', function (d: IFretboardSlotInformation, i: number) { return 'Note NoteName_' + d.NoteInformation.ChromaticNoteId.toString() + ' ' + (d.NoteInformation.IsAccidental ? 'AccidentalNote' : 'DiatonicNote'); });
  ////////////  // Bemol Note Name
  ////////////  group.append('text').attr('x', function (d: IFretboardSlotInformation, i: number) { return ((d.fretWidth - fretBar) / 2) - 5 })
  ////////////    .attr('y', function (d: IFretboardSlotInformation, i: number) { return (d.fretHeigth / 2) + 5 })
  ////////////    .text(function (d: IFretboardSlotInformation, i: number) { return d.NoteInformation.BemolName })
  ////////////    .attr('class', function (d: IFretboardSlotInformation, i: number) { return 'Bemol BemolName_' + d.NoteInformation.ChromaticNoteId.toString(); })
  ////////////    .attr('opacity', 0);
  ////////////  // Note Level
  ////////////  group.append('text').attr('x', function (d: IFretboardSlotInformation, i: number) { return ((d.fretWidth - fretBar) / 2) + 5 })
  ////////////    .attr('y', function (d: IFretboardSlotInformation, i: number) { return (d.fretHeigth / 2) + 8 })
  ////////////    .attr('font-size', 6)
  ////////////    .text(function (d: IFretboardSlotInformation, i: number) { return d.NoteInformation.LevelNumber })
  ////////////    .attr('class', function (d: IFretboardSlotInformation, i: number) { return 'Level LevelName_' + d.NoteInformation.ChromaticNoteId.toString(); });
  ////////////  // Note Accidental #
  ////////////  group.append('text').attr('x', function (d: IFretboardSlotInformation, i: number) { return ((d.fretWidth - fretBar) / 2) + 5 })
  ////////////    .attr('y', function (d: IFretboardSlotInformation, i: number) { return (d.fretHeigth / 2) - 2 })
  ////////////    .attr('font-size', 8)
  ////////////    .text(function (d: IFretboardSlotInformation, i: number) { return d.NoteInformation.IsAccidental ? "#" : ""; })
  ////////////    .attr('class', function (d: IFretboardSlotInformation, i: number) { return 'Sharp SharpName_' + d.NoteInformation.ChromaticNoteId.toString(); });
  ////////////  // Note Accidental b
  ////////////  group.append('text').attr('x', function (d: IFretboardSlotInformation, i: number) { return ((d.fretWidth - fretBar) / 2) + 5 })
  ////////////    .attr('y', function (d: IFretboardSlotInformation, i: number) { return (d.fretHeigth / 2) - 2 })
  ////////////    .attr('font-size', 8)
  ////////////    .text(function (d: IFretboardSlotInformation, i: number) { return d.NoteInformation.IsAccidental ? "b" : ""; })
  ////////////    .attr('class', function (d: IFretboardSlotInformation, i: number) { return 'Bemol BemolName_' + d.NoteInformation.ChromaticNoteId.toString(); })
  ////////////    .attr('opacity', 0);
  ////////////}
  ////////////generateNoteOptionButons(group: d3.Selection<any>, height: number, boxWidth: number, boxHeight) {
  ////////////  //AllChromatic

  ////////////  var allChromatic = group.append('g').on('click', () => { return this.onChromaticsClick(); }).attr('class', 'allChromaticGroup optionsGroup');
  ////////////  allChromatic.append('rect').attr('class', 'allGroup allChromatic cls-default-options').attr('x', 0).attr('y', 0).attr('width', boxWidth).attr('height', boxHeight).attr('rx', this.optionButtonRadius).attr('ry', this.optionButtonRadius);
  ////////////  allChromatic.append('text').attr('x', 2).attr('y', 13).attr('font-size', 8).attr('fill', '#fff').text('Chromatic');
  ////////////  //Diatonic
  ////////////  var allDiatonic = group.append('g').on('click', () => { return this.onDiatonicClick(); }).attr('class', 'allDiatonicGroup optionsGroup');
  ////////////  allDiatonic.append('rect').attr('class', 'allGroup allDiatonic cls-default-options').attr('x', boxWidth + 2).attr('y', 0).attr('width', boxWidth).attr('height', boxHeight).attr('rx', this.optionButtonRadius).attr('ry', this.optionButtonRadius);
  ////////////  allDiatonic.append('text').attr('x', boxWidth + 6).attr('y', 13).attr('font-size', 8).attr('fill', '#fff').text('Diatonic')
  ////////////  //Accidentals
  ////////////  var allAccidentals = group.append('g').on('click', () => { return this.onAccidentalClick(); }).attr('class', 'allAccidentalsGroup  optionsGroup');
  ////////////  allAccidentals.append('rect').attr('class', 'allGroup allAccidental cls-default-options').attr('x', 2 * boxWidth + 4).attr('y', 0).attr('width', boxWidth).attr('height', boxHeight).attr('rx', this.optionButtonRadius).attr('ry', this.optionButtonRadius);
  ////////////  allAccidentals.append('text').attr('x', 2 * boxWidth + 5).attr('y', 13).attr('font-size', 7).attr('fill', '#fff').text('Accidentals')
  ////////////  //Clear All
  ////////////  var allClear = group.append('g').on('click', () => { return this.onClearAllClick(); }).attr('class', 'allClearGroup  optionsGroup');
  ////////////  allClear.append('rect').attr('class', 'allGroup allClear cls-default-options').attr('x', 3 * boxWidth + 6).attr('y', 0).attr('width', boxWidth).attr('height', boxHeight).attr('rx', this.optionButtonRadius).attr('ry', this.optionButtonRadius)
  ////////////  allClear.append('text').attr('x', 3 * boxWidth + 9).attr('y', 13).attr('font-size', 8).attr('fill', '#fff').text('Clear All')
  ////////////  //Sharp
  ////////////  var allSharp = group.append('g').on('click', () => { return this.onSharpClick(); }).attr('class', 'allSharpGroup');
  ////////////  allSharp.append('rect').attr('class', 'allGroupAccidental allSharp cls-pressed-options').attr('x', 10 * boxWidth + 20).attr('y', 0).attr('width', boxWidth).attr('height', boxHeight).attr('rx', this.optionButtonRadius).attr('ry', this.optionButtonRadius);
  ////////////  allSharp.append('text').attr('x', 10 * boxWidth + 30).attr('y', 13).attr('font-size', 8).attr('fill', '#fff').text('Sharp')
  ////////////  //Bemol
  ////////////  var allBemol = group.append('g').on('click', () => { return this.onBemolClick(); }).attr('class', 'allBemolGroup');
  ////////////  allBemol.append('rect').attr('class', 'allGroupAccidental allBemol cls-default-options').attr('x', 11 * boxWidth + 22).attr('y', 0).attr('width', boxWidth).attr('height', boxHeight).attr('rx', this.optionButtonRadius).attr('ry', this.optionButtonRadius);
  ////////////  allBemol.append('text').attr('x', 11 * boxWidth + 30).attr('y', 13).attr('font-size', 8).attr('fill', '#fff').text('Bemol')
  ////////////}
  ////////////generateBoardOptionButons(group: d3.Selection<any>, height: number, boxWidth: number, boxHeight) {

  ////////////  //Notes
  ////////////  group.append('g').on('click', () => { return this.onFretBoardOptionChanged(3); })
  ////////////    .append('rect').attr('class', 'boardGroup boardGroup3 cls-pressed-options').attr('x', 0).attr('y', 0).attr('width', boxWidth).attr('height', boxHeight).attr('rx', this.optionButtonRadius).attr('ry', this.optionButtonRadius);
  ////////////  group.append('text').attr('x', 9).attr('y', 13).attr('font-size', 8).attr('fill', '#fff').text('Notes')
  ////////////  //Chords
  ////////////  group.append('g').on('click', () => { return this.onFretBoardOptionChanged(2); })
  ////////////    .append('rect').attr('class', 'boardGroup boardGroup2 cls-default-options').attr('x', boxWidth + 2).attr('y', 0).attr('width', boxWidth).attr('height', boxHeight).attr('rx', this.optionButtonRadius).attr('ry', this.optionButtonRadius);
  ////////////  group.append('text').attr('x', boxWidth + 8).attr('y', 13).attr('font-size', 8).attr('fill', '#fff').text('Chords')
  ////////////  //Scales
  ////////////  group.append('g').on('click', () => { return this.onFretBoardOptionChanged(1); })
  ////////////    .append('rect').attr('class', 'boardGroup boardGroup1 cls-default-options').attr('x', 2 * boxWidth + 4).attr('y', 0).attr('width', boxWidth).attr('height', boxHeight).attr('rx', this.optionButtonRadius).attr('ry', this.optionButtonRadius);
  ////////////  group.append('text').attr('x', 2 * boxWidth + 11).attr('y', 13).attr('font-size', 8).attr('fill', '#fff').text('Scales')
  ////////////}

  private resetCriteria(): void {
    this.svg.selectAll('.NoteGroup').selectAll('.Circle').transition().duration(this.transitionDuration).attr('stroke', this.noteCirleStroke).attr('fill', this.noteCircleFill);
    this.svg.selectAll('.chromaticButton').classed('cls-default-options', true);
    this.svg.selectAll('.chromaticButton').classed('cls-pressed-options', false);
    this.svg.selectAll('.allGroup').classed('cls-default-options', true);
    this.svg.selectAll('.allGroup').classed('cls-pressed-options', false);
    this.svg.selectAll('.NoteGroup').transition().duration(this.transitionDuration).attr('opacity', 0);
  }

  private firstScaleInStructure(item: IDropDownItem) {
    if (item.GroupId == StructureType.Scale) { return true; }
  }

  ////////////////private loadStructure(chromaticNoteId: number): void {
  ////////////////  this.resetCriteria();
  ////////////////  if (this.selectedStructureType) {
  ////////////////    let vm = this;
  ////////////////    vm.structure = this.staticDataService.getStructureType(this.selectedStructureType.Id);
  ////////////////    let majorScale = vm.staticDataService.getMajorScale(chromaticNoteId);

  ////////////////    vm.currentChord = new ChordResult(vm.structure.name, vm.structure.signature);
  ////////////////    vm.currentChord.ChordNotes = vm.structure.structureKeys;

  ////////////////    //Clear Array
  ////////////////    angular.forEach(vm.scalePositions, function (key, value) {
  ////////////////      key.Signature = '';
  ////////////////    });

  ////////////////    for (let index = 0; index < vm.structure.structureKeys.length; index++) {
  ////////////////      //After the end of the scale, it repeats ex. 1 =1 ... 7 = 7, 8 = 1, 9 = 2 ...   
  ////////////////      let majorScaleTransformedPosition = vm.structure.structureKeys[index].scalePosition == 7 ? 7 : vm.structure.structureKeys[index].scalePosition % 7;
  ////////////////      //Apply variation
  ////////////////      let position = this.applySemitoneVariation(majorScale[majorScaleTransformedPosition - 1], vm.structure.structureKeys[index].semitoneVariation);
  ////////////////      // Make the note visible
  ////////////////      this.svg.selectAll('.NoteGroup_' + position).select('circle').transition().duration(this.transitionDuration).attr('fill', NotesColors[majorScaleTransformedPosition]);
  ////////////////      this.svg.selectAll('.NoteGroup_' + position).transition().duration(this.transitionDuration).attr('opacity', 1);
  ////////////////    }
  ////////////////  }
  ////////////////}

  private applySemitoneVariation(position: number, semitoneVariation): number {
    let finalPosition = position + semitoneVariation;
    if (finalPosition <= 0) {
      finalPosition = 12 + finalPosition
    }; //Position in this case is a negative number; hence, we add it.   
    return finalPosition == 12 ? 12 : finalPosition % 12;
  }
}
