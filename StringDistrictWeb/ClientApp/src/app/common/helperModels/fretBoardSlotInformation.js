"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vwFrequencies_1 = require("../models/vwFrequencies");
var FretboardSlotInformation = /** @class */ (function () {
    function FretboardSlotInformation() {
        this.xPosition = 0;
        this.yPosition = 0;
        this.fretWidth = 0;
        this.fretHeigth = 0;
        this.class = '';
        this.stringGauge = 0;
        this.hasMarker = false;
        this.NoteInformation = new vwFrequencies_1.VW_Frequencies(0, 0, 0, 0, null, false, null, 0);
    }
    return FretboardSlotInformation;
}());
exports.FretboardSlotInformation = FretboardSlotInformation;
//# sourceMappingURL=fretBoardSlotInformation.js.map