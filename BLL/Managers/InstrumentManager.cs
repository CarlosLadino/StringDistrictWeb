namespace BLL.Managers
{
    using System.Linq;
    using Data.Models;
    using Common;

    public class InstrumentManager
    {
        private readonly DataContext _dataContext;
        public InstrumentManager(DataContext dataContext)
        {
            this._dataContext = dataContext;
        }

        public IQueryable<Instruments> All
        {
            get { return this._dataContext.Instruments.OrderBy(i => i.Name); }
        }

        public Instruments GetInstruments(int instrumentId) {
            return this._dataContext.Instruments.Where(i => i.Id == instrumentId).FirstOrDefault();
        }

        public IQueryable<DropDownItem> GetDropDownData(int? selectedId)
        {
            selectedId = selectedId == null ? 0 : selectedId;

            return this._dataContext.Instruments.Where(t => !t.IsArchived)
                .Union(this._dataContext.Instruments.Where(t => t.Id == selectedId))
                .Select(t => new DropDownItem { Id = t.Id, Name = t.Name })
                .OrderBy(t => t.Name);
        }    
    }
}
