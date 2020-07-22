namespace BLL.Managers
{
    using System.Linq;
    using Data.Models;
    using Common;

    public class TuningTypesManager
    {
        private readonly DataContext _dataContext;
        public TuningTypesManager(DataContext dataContext)      
        {
            this._dataContext = dataContext;
        }

        public IQueryable<TuningTypes> All
        {
            get { return this._dataContext.TuningTypes.OrderBy(i => i.Name); }
        }

        public TuningTypes GetTunings(int tuningTypeId) {
            return this._dataContext.TuningTypes.Where(i => i.Id == tuningTypeId).FirstOrDefault();
        }

        public IQueryable<DropDownItem> GetDropDownData(int instrumentId, int? selectedId)
        {
            selectedId = selectedId == null ? 0 : selectedId;

            return this._dataContext.TuningTypes.Where(t => t.InstrumentId == instrumentId)
                .Union(this._dataContext.TuningTypes.Where(t => t.Id == selectedId))
                .Select(t => new DropDownItem { Id = t.Id, Name = t.Name })
                .OrderBy(t => t.Name);
        }

        public IQueryable<VW_InstrumentsAndTunnings> GetInstrumentAndTunings() 
        {
            return this._dataContext.VW_InstrumentsAndTunnings;
        }
    }
}
