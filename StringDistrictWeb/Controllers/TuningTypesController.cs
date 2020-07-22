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

        [ActionName("GetTuningTypes")]
        public IActionResult GetTunings()
        {
            return Ok(this._tuningTypesManager.All.ToList());
        }
    }
}