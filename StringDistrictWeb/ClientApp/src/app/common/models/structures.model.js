"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Structure = /** @class */ (function () {
    function Structure(id, structureTypeId, name, isArchived, orderNumber, signature) {
        this.id = id;
        this.structureTypeId = structureTypeId;
        this.name = name;
        this.isArchived = isArchived;
        this.orderNumber = orderNumber;
        this.signature = signature;
        this.structureKeys = [];
    }
    return Structure;
}());
exports.Structure = Structure;
//# sourceMappingURL=structures.model.js.map