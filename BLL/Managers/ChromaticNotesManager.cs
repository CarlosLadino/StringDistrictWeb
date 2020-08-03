namespace BLL.Managers
{
    using System.Linq;
    using Data.Models;
    using Common;

    public class ChromaticNotesManager
    {
        private readonly DataContext _dataContext;
        public ChromaticNotesManager(DataContext dataContext)
        {
            this._dataContext = dataContext;
        }

        public IQueryable<ChromaticNotes> All
        {
            get { return this._dataContext.ChromaticNotes.OrderBy(i => i.Id); }
        }

        public ChromaticNotes GetNote(int noteId) {
            return this._dataContext.ChromaticNotes.Where(i => i.Id == noteId).FirstOrDefault();
        }

        public IQueryable<DropDownItem> GetDropDownData(int? selectedId)
        {
            selectedId = selectedId == null ? 0 : selectedId;

            return this._dataContext.ChromaticNotes
                .Union(this._dataContext.ChromaticNotes.Where(t => t.Id == selectedId))
                .Select(t => new DropDownItem { Id = t.Id, Name = t.Name })
                .OrderBy(t => t.Name);
        }    
    }
}
