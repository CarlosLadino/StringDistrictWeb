namespace BLL.Managers
{
    using System.Linq;
    using Data.Models;
    using Common;

    public class SiteVisitorManager
    {
        private readonly DataContext _dataContext;

        public SiteVisitorManager(DataContext dataContext)
        {
            this._dataContext = dataContext;
        }

        public IQueryable<SiteVisitors> All
        {
            get { return this._dataContext.SiteVisitors.OrderBy(i => i.VisitDate); }
        }

        public void SaveHit()
        {
            try
            {
                var yesterday = System.DateTime.Today.AddDays(-1);
                var tomorrow = System.DateTime.Today.AddDays(1);
                var day = this._dataContext.SiteVisitors.Where(v => v.VisitDate < tomorrow && v.VisitDate > yesterday).FirstOrDefault();
                if (day == null)
                {
                    day = new Data.Models.SiteVisitors { HitCount = 1, VisitDate = System.DateTime.Now };
                    this._dataContext.SiteVisitors.Add(day);
                }
                else
                {
                    day.HitCount++;
                }

                this._dataContext.SaveChanges();
            }
            catch (System.Exception)
            {
                // Eat it for now I will generate code to report exceptions late
            }
      
        }
    }
}
