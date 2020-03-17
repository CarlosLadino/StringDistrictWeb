namespace Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;
    using System.ComponentModel.DataAnnotations.Schema;

    public partial class Instruments
    {
        public Instruments()
        {
            TuningTypesInstrument = new HashSet<TuningTypes>();
        }

        [Required]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [StringLength(100)]
        public string Description { get; set; }

        [Required]
        public int NumberOfStrings { get; set; }

        [Required]
        public bool IsArchived { get; set; }

        [Required]
        public int FretsNumber { get; set; }

        [StringLength(50)]
        public string Markers { get; set; }


        [InverseProperty("Instrument")]
        [IgnoreDataMember]
        public virtual ICollection<TuningTypes> TuningTypesInstrument { get; set; }
    }
}
