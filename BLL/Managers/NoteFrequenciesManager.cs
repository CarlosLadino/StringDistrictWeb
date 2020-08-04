namespace BLL.Managers
{
    using System.Linq;
    using Data.Models;
    using Common;

    public class NoteFrequenciesManager
    {
        private readonly DataContext _dataContext;

        public NoteFrequenciesManager(DataContext dataContext)
        {
            this._dataContext = dataContext;
        }

        public IQueryable<NoteFrequencies> All
        {
            get { return this._dataContext.NoteFrequencies.OrderBy(i => i.Id); }
        }

        public IQueryable<VW_Frequencies> VW_All
        {
            get { return this._dataContext.VW_Frequencies.OrderBy(i => i.Id); }
        }
    }
}
