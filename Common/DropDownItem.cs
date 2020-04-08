namespace Common
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;

    public class DropDownItem : IEqualityComparer<DropDownItem>
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int? GroupId { get; set; }

        public int? OrderNumber { get; set; }

        public bool Equals(DropDownItem x, DropDownItem y)
        {
            if (x != null && y != null)
            {
                return x.Id == y.Id;
            }
            else
            {
                return false;
            }
        }

        public int GetHashCode(DropDownItem obj)
        {
            if (obj != null)
            {
                return obj.Id.GetHashCode();
            }
            else
            {
                return 0;
            }
        }
    }
}
