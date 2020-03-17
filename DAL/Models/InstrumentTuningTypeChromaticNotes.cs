namespace Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;
    using System.ComponentModel.DataAnnotations.Schema;

    public partial class InstrumentTuningTypeChromaticNotes
    {
        public InstrumentTuningTypeChromaticNotes()
        {
            
        }

        [Required]
        public int Id { get; set; }

        [Required]
        public int TuningTypeId { get; set; }

        [Required]
        public int NoteFrequencyId { get; set; }

        [Required]
        public int StringNumber { get; set; }

        [Required]
        public int StringGauge { get; set; }

        [Required]
        public int StartAtFretNumber { get; set; }
 
        [ForeignKey("NoteFrequencyId")]
        [InverseProperty("InstrumentTuningTypeChromaticNotesNoteFrequency")]
        [IgnoreDataMember]
        public virtual NoteFrequencies NoteFrequency { get; set; }
 
        [ForeignKey("TuningTypeId")]
        [InverseProperty("InstrumentTuningTypeChromaticNotesTuningType")]
        [IgnoreDataMember]
        public virtual TuningTypes TuningType { get; set; }

    }
}
