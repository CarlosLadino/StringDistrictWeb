namespace BLL.Managers
{
    using System.Linq;
    using Data.Models;
    using Common;

    public class NoteFrequenciesManager : ManagerBase
    {
        public NoteFrequenciesManager()
                    : base()
        {
        }

        public NoteFrequenciesManager(ref DataContext dataContext)
            : base(ref dataContext)
        {
        }

        public IQueryable<NoteFrequencies> All
        {
            get { return this.DataContext.NoteFrequencies.OrderBy(i => i.Id); }
        }

        public IQueryable<VW_Frequencies> VW_All
        {
            get { return this.DataContext.VW_Frequencies.OrderBy(i => i.Id); }
        }
    }
}
