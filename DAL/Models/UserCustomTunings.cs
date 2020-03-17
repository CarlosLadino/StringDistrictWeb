namespace Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;
    using System.ComponentModel.DataAnnotations.Schema;

    public partial class UserCustomTunings
    {
        public UserCustomTunings()
        {
            UserCustomTuningNotesUserCustomTuning = new HashSet<UserCustomTuningNotes>();
        }

        [Required]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [Required]
        public int UserId { get; set; }
 
        [ForeignKey("UserId")]
        [InverseProperty("UserCustomTuningsUser")]
        [IgnoreDataMember]
        public virtual Users User { get; set; }

        [InverseProperty("UserCustomTuning")]
        [IgnoreDataMember]
        public virtual ICollection<UserCustomTuningNotes> UserCustomTuningNotesUserCustomTuning { get; set; }
    }
}
