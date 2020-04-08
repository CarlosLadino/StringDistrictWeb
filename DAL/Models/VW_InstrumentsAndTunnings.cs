namespace Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public partial class VW_InstrumentsAndTunnings
    {
        public VW_InstrumentsAndTunnings()
        {}

        public int Id { get; set; }

        [StringLength(100)]
        public string Name { get; set; }

        public int NumberOfStrings { get; set; }

        public bool IsArchived { get; set; }

        public int FretsNumber { get; set; }

        [StringLength(100)]
        public string Description { get; set; }

        public string AvailableTunings { get; set; }
    }
}
