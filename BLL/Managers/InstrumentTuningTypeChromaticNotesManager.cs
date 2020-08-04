namespace BLL.Managers
{
    using System.Linq;
    using Data.Models;
    using Common;

    public class InstrumentTuningTypeChromaticNotesManager
    {
        private readonly DataContext _dataContext;

        public InstrumentTuningTypeChromaticNotesManager(DataContext dataContext)
        {
            this._dataContext = dataContext;
        }

        public IQueryable<InstrumentTuningTypeChromaticNotes> All
        {
            get { return this._dataContext.InstrumentTuningTypeChromaticNotes; }
        }

        public IQueryable<InstrumentTuningTypeChromaticNotes> GetInstrumentTuningTypeChromaticNotesByTuningId(int tuningTypeId)
        {
            return this._dataContext.InstrumentTuningTypeChromaticNotes.Where(n => n.TuningTypeId == tuningTypeId);
        }
    }
}
