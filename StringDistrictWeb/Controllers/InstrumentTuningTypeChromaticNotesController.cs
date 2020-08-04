using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLL.Managers;
using Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace StringDistrictWeb.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class InstrumentTuningTypeChromaticNotesController : ControllerBase
    {
        private readonly InstrumentTuningTypeChromaticNotesManager _ittcnManager;

        public InstrumentTuningTypeChromaticNotesController(InstrumentTuningTypeChromaticNotesManager ittcnManager)
        {
            this._ittcnManager = ittcnManager;
        }

        [ActionName("GetInstrumentTuningTypeChromaticNotesByTuningId")]
        public IActionResult GetInstrumentTuningTypeChromaticNotesByTuningId(int tuningTypeId)
        {
            var data = this._ittcnManager.GetInstrumentTuningTypeChromaticNotesByTuningId(tuningTypeId).ToList();
            return Ok(data);
        }
    }
}