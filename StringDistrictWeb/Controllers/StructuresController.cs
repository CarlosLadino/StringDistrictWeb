using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLL.Managers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace StringDistrictWeb.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class StructuresController : ControllerBase
    {
        private readonly StructuresManager _structuresManager;

        public StructuresController(StructuresManager structuresManager)
        {
            this._structuresManager = structuresManager;
        }

        [ActionName("GetChordTypes")]
        public IActionResult GetChordTypes()
        {
            return Ok(this._structuresManager.GetDropDownData((int)Common.Enumerations.StructureType.Chord, 0).ToList());
        }

        [ActionName("GetScaleTypes")]
        public IActionResult GetScaleTypes()
        {
            return Ok(this._structuresManager.GetDropDownData((int)Common.Enumerations.StructureType.Scale, 0).ToList());
        }


        [ActionName("GetStructure")]
        public IActionResult GetStructure(int structureId)
        {
            return Ok(this._structuresManager.GetStructure(structureId));
        }

        [ActionName("GetStructureTypes")]
        public IActionResult GetStructureTypes()
        {
            return Ok(this._structuresManager.GetStructureTypes());
        }

        [ActionName("GetScale")]
        public IActionResult GetScale(int scaleId)
        {
            return Ok(this._structuresManager.GetStructure(scaleId));
        }
    }
}