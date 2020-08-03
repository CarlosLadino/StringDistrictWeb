﻿using System;
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
        private TuningTypesManager _tuningTypeManager;
        private TuningTypeNotesManager tuningtypeNotesManager = new TuningTypeNotesManager();
        private ChromaticNotesManager _chromaticNotesManager;
        private StructuresManager structureManager = new StructuresManager();
        private NoteFrequenciesManager noteFrequenciesManager = new NoteFrequenciesManager();
        private InstrumentTuningTypeChromaticNotesManager ittcnManager = new InstrumentTuningTypeChromaticNotesManager();

        public InstrumentsController(InstrumentsManager instrumentManager, TuningTypesManager tuningTypesManager)
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

        [ActionName("GetTunings")]
        public IActionResult GetTunings()
        {
            return Ok(this.tuningtypeNotesManager.All.ToList());
        }

        [ActionName("GetTuningTypesByInstrumentId")]
        public IActionResult GetTuningTypesByInstrumentId(int instrumentId)
        {
            return Ok(this._tuningTypeManager.GetDropDownData(instrumentId, 0).ToList());            
        }

        [ActionName("GetTuningTypes")]
        public IActionResult GetTuningTypes()
        {
            var tunings = this._tuningTypeManager.All.ToList();
            return Ok(tunings);            
        }

        [ActionName("GetTuningNotes")]
        public IActionResult GetTuningNotes(int tuningTypeId)
        {
            return Ok(this.tuningtypeNotesManager.GetTuning(tuningTypeId).ToList());
        }

        [ActionName("GetTuningByInstrument")]
        public IActionResult GetTuningNotesByInstrument(int instrumentId)
        {
            return Ok(this.tuningtypeNotesManager.GetTuningsByInstrument(instrumentId).ToList());
        }

        [ActionName("GetChromaticNotes")]
        public IActionResult GetChromaticNotes()
        {
            return Ok(this._chromaticNotesManager.All.ToList());
        }

        [ActionName("GetInstrumentsATunings")]
        public IActionResult GetInstrumentsATunings()
        {
            return Ok(this._tuningTypeManager.GetInstrumentAndTunings().ToList());
        }

        [ActionName("GetNoteFrequenciesView")]
        public IActionResult GetNoteFrequenciesView()
        {
            return Ok(this.noteFrequenciesManager.VW_All.ToList());
        }

        [ActionName("GetStructures")]
        public IActionResult GetStructures()
        {
            return Ok(this.structureManager.GetDropDownData(0).ToList());
        }

        [ActionName("GetChordTypes")]
        public IActionResult GetChordTypes()
        {
            return Ok(this.structureManager.GetDropDownData((int)Common.Enumerations.StructureType.Chord, 0).ToList());
        }

        [ActionName("GetScaleTypes")]
        public IActionResult GetScaleTypes()
        {
            return Ok(this.structureManager.GetDropDownData((int)Common.Enumerations.StructureType.Scale, 0).ToList());
        }


        [ActionName("GetStructure")]
        public IActionResult GetStructure(int structureId)
        {
            return Ok(this.structureManager.GetStructure(structureId));
        }

        [ActionName("GetStructureTypes")]
        public IActionResult GetStructureTypes()
        {
            return Ok(this.structureManager.GetStructureTypes());
        }

        [ActionName("GetScale")]
        public IActionResult GetScale(int scaleId)
        {
            return Ok(this.structureManager.GetStructure(scaleId));            
        }

        [ActionName("GetInstrumentTuningTypeChromaticNotesByTuningId")]
        public IActionResult GetInstrumentTuningTypeChromaticNotesByTuningId(int tuningTypeId)
        {
            var data = this.ittcnManager.GetInstrumentTuningTypeChromaticNotesByTuningId(tuningTypeId).ToList();
            return Ok(data);
        }
    }
}