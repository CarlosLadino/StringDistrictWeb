namespace Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;
    using System.ComponentModel.DataAnnotations.Schema;

    public partial class UserCustomTuningNotes
    {
        public UserCustomTuningNotes()
        {
            
        }

        [Required]
        public int Id { get; set; }

        [Required]
        public int UserCustomTuningId { get; set; }

        [Required]
        public int NoteFrecuencyId { get; set; }

        [Required]
        public int StringNumber { get; set; }

        [Required]
        public int StringGauge { get; set; }
 
        [ForeignKey("NoteFrecuencyId")]
        [InverseProperty("UserCustomTuningNotesNoteFrecuency")]
        [IgnoreDataMember]
        public virtual NoteFrequencies NoteFrecuency { get; set; }
 
        [ForeignKey("UserCustomTuningId")]
        [InverseProperty("UserCustomTuningNotesUserCustomTuning")]
        [IgnoreDataMember]
        public virtual UserCustomTunings UserCustomTuning { get; set; }

    }
}
