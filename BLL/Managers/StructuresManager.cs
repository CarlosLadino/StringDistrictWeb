namespace BLL.Managers
{
    using System.Linq;
    using Data.Models;
    using Common;
    using Microsoft.EntityFrameworkCore;

    public class StructuresManager
    {
        private readonly DataContext _dataContext;

        public StructuresManager(DataContext dataContext)
        {
            this._dataContext = dataContext;
        }

        public IQueryable<Structures> All
        {
            get { return this._dataContext.Structures.OrderBy(i => i.Name); }
        }

        public Structures GetStructure(int structureId) {
            return this._dataContext.Structures.Include("StructureKeys").Where(i => i.Id == structureId).FirstOrDefault();            
        }

        public IQueryable<Structures> GetStructureTypes()
        {
            return this._dataContext.Structures.Include("StructureKeys");
        }

        public IQueryable<DropDownItem> GetDropDownData(int structureTypeId, int? selectedId)
        {
            selectedId = selectedId == null ? 0 : selectedId;

            var data = this._dataContext.Structures.Where(t => t.IsArchived == false && t.StructureTypeId == structureTypeId)
                .Union(this._dataContext.Structures.Where(t => t.Id == selectedId))
                .Select(t => new DropDownItem { Id = t.Id, Name = t.Name, OrderNumber = t.OrderNumber, GroupId = t.StructureTypeId })
                .OrderBy(t => t.OrderNumber);

            return data;
        }

        public IQueryable<DropDownItem> GetDropDownData(int? selectedId)
        {
            selectedId = selectedId == null ? 0 : selectedId;

            var data = this._dataContext.Structures.Where(t => t.IsArchived == false)
                .Union(this._dataContext.Structures.Where(t => t.Id == selectedId))
                .Select(t => new DropDownItem { Id = t.Id, Name = t.Name, OrderNumber = t.OrderNumber, GroupId = t.StructureTypeId })
                .OrderBy(t => t.OrderNumber);

            return data;
        }    
    }
}
