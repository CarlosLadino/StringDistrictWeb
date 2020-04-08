namespace BLL.Managers
{
    using System.Linq;
    using Data.Models;
    using Common;

    public class InstrumentTuningTypeChromaticNotesManager : ManagerBase
    {
        public InstrumentTuningTypeChromaticNotesManager()
                    : base()
        {
        }

        public InstrumentTuningTypeChromaticNotesManager(ref DataContext dataContext)
            : base(ref dataContext)
        {
        }

        public IQueryable<InstrumentTuningTypeChromaticNotes> All
        {
            get { return this.DataContext.InstrumentTuningTypeChromaticNotes; }
        }

        public IQueryable<InstrumentTuningTypeChromaticNotes> GetInstrumentTuningTypeChromaticNotesByTuningId(int tuningTypeId)
        {
            return this.DataContext.InstrumentTuningTypeChromaticNotes.Where(n => n.TuningTypeId == tuningTypeId);
        }
    }
}
