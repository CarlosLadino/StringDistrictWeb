namespace BLL.Managers
{
    using System.Linq;
    using Data.Models;
    using Common;
    using System.Collections.Generic;

    public class TuningTypeNotesManager : ManagerBase
    {
        public TuningTypeNotesManager()
            : base()
        {
        }

        public TuningTypeNotesManager(ref DataContext dataContext)
            : base(ref dataContext)
        {
        }

        public IQueryable<InstrumentTuningTypeChromaticNotes> All
        {
            get { return this.DataContext.InstrumentTuningTypeChromaticNotes.OrderBy(i => i.TuningTypeId); }
        }

        public IEnumerable<InstrumentTuningTypeChromaticNotes> GetTuning(int tuningTypeId)
        {
            return this.DataContext.InstrumentTuningTypeChromaticNotes.Where(i => i.TuningTypeId == tuningTypeId);
        }

        public IEnumerable<InstrumentTuningTypeChromaticNotes> GetTuningsByInstrument(int instrumentId)
        {
            return from c in this.DataContext.InstrumentTuningTypeChromaticNotes
                   join t in this.DataContext.TuningTypes on c.TuningTypeId equals t.Id
                   join i in this.DataContext.Instruments on t.InstrumentId equals i.Id
                   where i.Id == instrumentId
                   select c;
        }

    }
}
