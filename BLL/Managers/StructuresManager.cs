namespace BLL.Managers
{
    using System.Linq;
    using Data.Models;
    using Common;
    using Microsoft.EntityFrameworkCore;

    public class StructuresManager : ManagerBase 
    {
        public StructuresManager ()
                    :base ()
        {
        }

        public StructuresManager(ref DataContext dataContext)
            :base(ref dataContext)
        {            
        }

        public IQueryable<Structures> All
        {
            get { return this.DataContext.Structures.OrderBy(i => i.Name); }
        }

        public Structures GetStructure(int structureId) {
            return this.DataContext.Structures.Include("StructureKeys").Where(i => i.Id == structureId).FirstOrDefault();            
        }

        public IQueryable<Structures> GetStructureTypes()
        {
            return this.DataContext.Structures.Include("StructureKeys");
        }

        public IQueryable<DropDownItem> GetDropDownData(int structureTypeId, int? selectedId)
        {
            selectedId = selectedId == null ? 0 : selectedId;

            var data = this.DataContext.Structures.Where(t => t.IsArchived == false && t.StructureTypeId == structureTypeId)
                .Union(this.DataContext.Structures.Where(t => t.Id == selectedId))
                .Select(t => new DropDownItem { Id = t.Id, Name = t.Name, OrderNumber = t.OrderNumber, GroupId = t.StructureTypeId })
                .OrderBy(t => t.OrderNumber);

            return data;
        }

        public IQueryable<DropDownItem> GetDropDownData(int? selectedId)
        {
            selectedId = selectedId == null ? 0 : selectedId;

            var data = this.DataContext.Structures.Where(t => t.IsArchived == false)
                .Union(this.DataContext.Structures.Where(t => t.Id == selectedId))
                .Select(t => new DropDownItem { Id = t.Id, Name = t.Name, OrderNumber = t.OrderNumber, GroupId = t.StructureTypeId })
                .OrderBy(t => t.OrderNumber);

            return data;
        }    
    }
}
