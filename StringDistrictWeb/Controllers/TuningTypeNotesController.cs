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
    public class TuningTypeNotesController : ControllerBase
    {
        private readonly TuningTypeNotesManager _tuningTypeNotesManager;

        public TuningTypeNotesController(TuningTypeNotesManager tuningTypeNotesManager)
        {
            this._tuningTypeNotesManager = tuningTypeNotesManager;
        }

        [ActionName("GetTunings")]
        public IActionResult GetTunings()
        {
            return Ok(this._tuningTypeNotesManager.All.ToList());
        }

        [ActionName("GetTuningNotes")]
        public IActionResult GetTuningNotes(int tuningTypeId)
        {
            return Ok(this._tuningTypeNotesManager.GetTuning(tuningTypeId).ToList());
        }

        [ActionName("GetTuningByInstrument")]
        public IActionResult GetTuningNotesByInstrument(int instrumentId)
        {
            return Ok(this._tuningTypeNotesManager.GetTuningsByInstrument(instrumentId).ToList());
        }
    }
}