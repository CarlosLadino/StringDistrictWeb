namespace Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;
    using System.ComponentModel.DataAnnotations.Schema;

    public partial class ChromaticNotes
    {
        public ChromaticNotes()
        {
            NoteFrequenciesChromaticNote = new HashSet<NoteFrequencies>();
        }

        [Required]
        public int Id { get; set; }

        [Required]
        [StringLength(1)]
        public string Name { get; set; }

        [Required]
        public bool IsAccidental { get; set; }

        [StringLength(1)]
        public string BemolName { get; set; }


        [InverseProperty("ChromaticNote")]
        [IgnoreDataMember]
        public virtual ICollection<NoteFrequencies> NoteFrequenciesChromaticNote { get; set; }
    }
}
