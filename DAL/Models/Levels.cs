namespace Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;
    using System.ComponentModel.DataAnnotations.Schema;

    public partial class Levels
    {
        public Levels()
        {
            NoteFrequenciesLevel = new HashSet<NoteFrequencies>();
        }

        [Required]
        public int Id { get; set; }

        [Required]
        public int Number { get; set; }


        [InverseProperty("Level")]
        [IgnoreDataMember]
        public virtual ICollection<NoteFrequencies> NoteFrequenciesLevel { get; set; }
    }
}
