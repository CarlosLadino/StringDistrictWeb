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
    public class NoteFrequenciesController : ControllerBase
    {
        private readonly NoteFrequenciesManager _noteFrequenciesManager;

        public NoteFrequenciesController(NoteFrequenciesManager noteFrequenciesManager)
        {
            this._noteFrequenciesManager = noteFrequenciesManager;
        }

        [ActionName("GetNoteFrequenciesView")]
        public IActionResult GetNoteFrequenciesView()
        {
            return Ok(this._noteFrequenciesManager.VW_All.ToList());
        }
    }   
}