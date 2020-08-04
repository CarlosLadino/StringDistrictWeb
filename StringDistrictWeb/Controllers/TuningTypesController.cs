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
    public class TuningTypesController : ControllerBase
    {
        private readonly TuningTypesManager _tuningTypesManager;

        public TuningTypesController(TuningTypesManager tunigTypesManager)
        {
            this._tuningTypesManager = tunigTypesManager;
        }

        [ActionName("GetTuningTypesByInstrumentId")]
        public IActionResult GetTuningTypesByInstrumentId(int instrumentId)
        {
            return Ok(this._tuningTypesManager.GetDropDownData(instrumentId, 0).ToList());
        }

        [ActionName("GetTuningTypes")]
        public IActionResult GetTuningTypes()
        {
            var tunings = this._tuningTypesManager.All.ToList();
            return Ok(tunings);
        }

        [ActionName("GetInstrumentsATunings")]
        public IActionResult GetInstrumentsATunings()
        {
            return Ok(this._tuningTypesManager.GetInstrumentAndTunings().ToList());
        }
    }
}