namespace BLL.Managers
{
    using System;
    using Data.Models;

    public abstract class ManagerBase: IDisposable
    {
        internal  DataContext DataContext;
        #region ctors

        protected ManagerBase()
        {
            this.DataContext = new DataContext();
        }

        protected ManagerBase(ref DataContext dataContext)
        {
            this.DataContext = dataContext;          
        }

        ~ManagerBase()
        {
            this.Dispose(false);
        }
        #endregion

            #region IDisposable Implementation

        public void Dispose()
        {
            this.Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (this.DataContext != null)
                {
                    this.DataContext.Dispose();
                }            
            }
        }

        #endregion
    }
}
