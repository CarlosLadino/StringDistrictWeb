namespace Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;
    using System.ComponentModel.DataAnnotations.Schema;

    public partial class TuningTypes
    {
        public TuningTypes()
        {
            InstrumentTuningTypeChromaticNotesTuningType = new HashSet<InstrumentTuningTypeChromaticNotes>();
        }

        [Required]
        public int Id { get; set; }

        [Required]
        public int InstrumentId { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }
 
        [ForeignKey("InstrumentId")]
        [InverseProperty("TuningTypesInstrument")]
        [IgnoreDataMember]
        public virtual Instruments Instrument { get; set; }

        [InverseProperty("TuningType")]
        [IgnoreDataMember]
        public virtual ICollection<InstrumentTuningTypeChromaticNotes> InstrumentTuningTypeChromaticNotesTuningType { get; set; }
    }
}
