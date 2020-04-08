namespace BLL.Managers
{
    using System.Linq;
    using Data.Models;
    using Common;

    public class SiteVisitorManager : ManagerBase 
    {
        public SiteVisitorManager()
                    :base ()
        {
        }

        public SiteVisitorManager(ref DataContext dataContext)
            :base(ref dataContext)
        {            
        }

        public IQueryable<SiteVisitors> All
        {
            get { return this.DataContext.SiteVisitors.OrderBy(i => i.VisitDate); }
        }

        public void SaveHit()
        {
            try
            {
                var yesterday = System.DateTime.Today.AddDays(-1);
                var tomorrow = System.DateTime.Today.AddDays(1);
                var day = this.DataContext.SiteVisitors.Where(v => v.VisitDate < tomorrow && v.VisitDate > yesterday).FirstOrDefault();
                if (day == null)
                {
                    day = new Data.Models.SiteVisitors { HitCount = 1, VisitDate = System.DateTime.Now };
                    this.DataContext.SiteVisitors.Add(day);
                }
                else
                {
                    day.HitCount++;
                }

                this.DataContext.SaveChanges();
            }
            catch (System.Exception)
            {
                // Eat it for now I will generate code to report exceptions late
            }
      
        }
    }
}
