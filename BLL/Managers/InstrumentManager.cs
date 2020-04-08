namespace BLL.Managers
{
    using System.Linq;
    using Data.Models;
    using Common;

    public class InstrumentManager : ManagerBase 
    {
        public InstrumentManager()
                    :base ()
        {
        }

        public InstrumentManager(ref DataContext dataContext)
            :base(ref dataContext)
        {            
        }

        public IQueryable<Instruments> All
        {
            get { return this.DataContext.Instruments.OrderBy(i => i.Name); }
        }

        public Instruments GetInstruments(int instrumentId) {
            return this.DataContext.Instruments.Where(i => i.Id == instrumentId).FirstOrDefault();
        }

        public IQueryable<DropDownItem> GetDropDownData(int? selectedId)
        {
            selectedId = selectedId == null ? 0 : selectedId;

            return this.DataContext.Instruments.Where(t => !t.IsArchived)
                .Union(this.DataContext.Instruments.Where(t => t.Id == selectedId))
                .Select(t => new DropDownItem { Id = t.Id, Name = t.Name })
                .OrderBy(t => t.Name);
        }    
    }
}
