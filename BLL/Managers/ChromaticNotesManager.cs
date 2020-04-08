namespace BLL.Managers
{
    using System.Linq;
    using Data.Models;
    using Common;

    public class ChromaticNotesManager : ManagerBase 
    {
        public ChromaticNotesManager()
                    :base ()
        {
        }

        public ChromaticNotesManager(ref DataContext dataContext)
            :base(ref dataContext)
        {            
        }

        public IQueryable<ChromaticNotes> All
        {
            get { return this.DataContext.ChromaticNotes.OrderBy(i => i.Id); }
        }

        public ChromaticNotes GetNote(int noteId) {
            return this.DataContext.ChromaticNotes.Where(i => i.Id == noteId).FirstOrDefault();
        }

        public IQueryable<DropDownItem> GetDropDownData(int? selectedId)
        {
            selectedId = selectedId == null ? 0 : selectedId;

            return this.DataContext.ChromaticNotes
                .Union(this.DataContext.ChromaticNotes.Where(t => t.Id == selectedId))
                .Select(t => new DropDownItem { Id = t.Id, Name = t.Name })
                .OrderBy(t => t.Name);
        }    
    }
}
