namespace BLL.Managers
{
    using System.Linq;
    using Data.Models;
    using Common;
    using System.Collections.Generic;

    public class TuningTypeNotesManager
    {
        private readonly DataContext _dataContext;

        public TuningTypeNotesManager(DataContext dataContext)
        {
            this._dataContext = dataContext;
        }

        public IQueryable<InstrumentTuningTypeChromaticNotes> All
        {
            get { return this._dataContext.InstrumentTuningTypeChromaticNotes.OrderBy(i => i.TuningTypeId); }
        }

        public IEnumerable<InstrumentTuningTypeChromaticNotes> GetTuning(int tuningTypeId)
        {
            return this._dataContext.InstrumentTuningTypeChromaticNotes.Where(i => i.TuningTypeId == tuningTypeId);
        }

        public IEnumerable<InstrumentTuningTypeChromaticNotes> GetTuningsByInstrument(int instrumentId)
        {
            return from c in this._dataContext.InstrumentTuningTypeChromaticNotes
                   join t in this._dataContext.TuningTypes on c.TuningTypeId equals t.Id
                   join i in this._dataContext.Instruments on t.InstrumentId equals i.Id
                   where i.Id == instrumentId
                   select c;
        }

    }
}
