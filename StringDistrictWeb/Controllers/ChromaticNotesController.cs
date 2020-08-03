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
    public class ChromaticNotesController : ControllerBase
    {
        private readonly ChromaticNotesManager _chromaticNotesManager;

        public ChromaticNotesController(ChromaticNotesManager chromaticNotesManager)
        {
            this._chromaticNotesManager = chromaticNotesManager;
        }

        [ActionName("GetChromaticNotes")]
        public IActionResult GetChromaticNotes()
        {
            return Ok(this._chromaticNotesManager.All.ToList());
        }
    }
}