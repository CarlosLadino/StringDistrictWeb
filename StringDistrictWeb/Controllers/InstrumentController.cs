using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLL.Managers;
using System.Net.Http;
using System.Net;
using Data.Models;

namespace StringDistrictWeb.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class InstrumentsController : ControllerBase
    {
        private InstrumentsManager _instrumentManager;
  
        public InstrumentsController(InstrumentsManager instrumentManager)
        {
            this._instrumentManager = instrumentManager;
        }

        [ActionName("GetInstruments")]
        public ActionResult<IEnumerable<Instruments>> GetInstruments()
        {            
            return Ok(this._instrumentManager.All.ToList());            
        }

        [ActionName("GetInstrumentById")]
        public IActionResult GetInstruments(int instrumentId)
        {
            var data = this._instrumentManager.All.Where(i => i.Id == instrumentId).FirstOrDefault();
            return Ok(data);            
        }
    }
}