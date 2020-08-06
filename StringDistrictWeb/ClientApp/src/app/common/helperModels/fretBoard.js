"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Fretboard = /** @class */ (function () {
    function Fretboard(isntrumentId, tuningId, name, isDotInlayVisible, isLinearInlayVisible) {
        this.isntrumentId = isntrumentId;
        this.tuningId = tuningId;
        this.name = name;
        this.isDotInlayVisible = isDotInlayVisible;
        this.isLinearInlayVisible = isLinearInlayVisible;
        this.stringGauges = new Object;
        this.notes = new Object;
    }
    return Fretboard;
}());
exports.Fretboard = Fretboard;
//# sourceMappingURL=fretBoard.js.map