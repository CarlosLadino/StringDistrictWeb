namespace Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;
    using System.ComponentModel.DataAnnotations.Schema;

    public partial class NoteFrequencies
    {
        public NoteFrequencies()
        {
            InstrumentTuningTypeChromaticNotesNoteFrequency = new HashSet<InstrumentTuningTypeChromaticNotes>();
            UserCustomTuningNotesNoteFrecuency = new HashSet<UserCustomTuningNotes>();
        }

        [Required]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "decimal(8, 4)")]
        public decimal Frequency { get; set; }

        public int? LevelId { get; set; }

        public int? ChromaticNoteId { get; set; }
 
        [ForeignKey("ChromaticNoteId")]
        [InverseProperty("NoteFrequenciesChromaticNote")]
        [IgnoreDataMember]
        public virtual ChromaticNotes ChromaticNote { get; set; }
 
        [ForeignKey("LevelId")]
        [InverseProperty("NoteFrequenciesLevel")]
        [IgnoreDataMember]
        public virtual Levels Level { get; set; }

        [InverseProperty("NoteFrequency")]
        [IgnoreDataMember]
        public virtual ICollection<InstrumentTuningTypeChromaticNotes> InstrumentTuningTypeChromaticNotesNoteFrequency { get; set; }

        [InverseProperty("NoteFrecuency")]
        [IgnoreDataMember]
        public virtual ICollection<UserCustomTuningNotes> UserCustomTuningNotesNoteFrecuency { get; set; }
    }
}
