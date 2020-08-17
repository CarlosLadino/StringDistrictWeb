"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StringTypes;
(function (StringTypes) {
    StringTypes[StringTypes["Melody"] = 1] = "Melody";
    StringTypes[StringTypes["Bass"] = 2] = "Bass";
})(StringTypes = exports.StringTypes || (exports.StringTypes = {}));
var StickModels;
(function (StickModels) {
    StickModels[StickModels["ClassicStick"] = 1] = "ClassicStick";
    StickModels[StickModels["GrandStick"] = 3] = "GrandStick";
    StickModels[StickModels["StickBass"] = 5] = "StickBass";
    StickModels[StickModels["NSStickBass"] = 7] = "NSStickBass";
    StickModels[StickModels["AltoStick"] = 8] = "AltoStick";
    StickModels[StickModels["StickGuitar"] = 9] = "StickGuitar";
})(StickModels = exports.StickModels || (exports.StickModels = {}));
var StructureType;
(function (StructureType) {
    StructureType[StructureType["Scale"] = 1] = "Scale";
    StructureType[StructureType["Chord"] = 2] = "Chord";
})(StructureType = exports.StructureType || (exports.StructureType = {}));
var NotesColors = /** @class */ (function () {
    function NotesColors() {
    }
    NotesColors[1] = "#E2311D";
    NotesColors[2] = "#4D7A96";
    NotesColors[3] = "#9EC675";
    NotesColors[4] = "#D88DB6";
    NotesColors[5] = "#9ECEFF";
    NotesColors[6] = "#C0C0C0";
    NotesColors[7] = "#F4EF71";
    NotesColors[8] = "#E5E2C1";
    return NotesColors;
}());
exports.NotesColors = NotesColors;
var DefaultNotesColors = /** @class */ (function () {
    function DefaultNotesColors() {
    }
    DefaultNotesColors.fill = "#ffffff";
    DefaultNotesColors.stroke = "#b3b3b3";
    return DefaultNotesColors;
}());
exports.DefaultNotesColors = DefaultNotesColors;
var ChordType;
(function (ChordType) {
    ChordType[ChordType["Major"] = 1] = "Major";
    ChordType[ChordType["Minor"] = 2] = "Minor";
})(ChordType = exports.ChordType || (exports.ChordType = {}));
//# sourceMappingURL=enumerations.js.map