namespace BLL.Managers
{
    using System.Linq;
    using Data.Models;
    using Common;

    public class TunigTypesManager : ManagerBase 
    {
        public TunigTypesManager()
                    :base ()
        {
        }

        public TunigTypesManager(ref DataContext dataContext)
            :base(ref dataContext)
        {            
        }

        public IQueryable<TuningTypes> All
        {
            get { return this.DataContext.TuningTypes.OrderBy(i => i.Name); }
        }

        public TuningTypes GetTunings(int tuningTypeId) {
            return this.DataContext.TuningTypes.Where(i => i.Id == tuningTypeId).FirstOrDefault();
        }

        public IQueryable<DropDownItem> GetDropDownData(int instrumentId, int? selectedId)
        {
            selectedId = selectedId == null ? 0 : selectedId;

            return this.DataContext.TuningTypes.Where(t => t.InstrumentId == instrumentId)
                .Union(this.DataContext.TuningTypes.Where(t => t.Id == selectedId))
                .Select(t => new DropDownItem { Id = t.Id, Name = t.Name })
                .OrderBy(t => t.Name);
        }

        public IQueryable<VW_InstrumentsAndTunnings> GetInstrumentAndTunings() 
        {
            return this.DataContext.VW_InstrumentsAndTunnings;
        }
    }
}
