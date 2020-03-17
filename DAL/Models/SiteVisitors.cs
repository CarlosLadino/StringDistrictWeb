namespace Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;
    using System.ComponentModel.DataAnnotations.Schema;

    public partial class SiteVisitors
    {
        public SiteVisitors()
        {
            
        }

        [Required]
        public int Id { get; set; }

        [Required]
        public long HitCount { get; set; }

        [Required]
        public DateTime VisitDate { get; set; }


    }
}
