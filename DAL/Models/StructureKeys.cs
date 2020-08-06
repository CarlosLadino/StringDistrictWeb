namespace Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Text.Json.Serialization;

    public partial class StructureKeys
    {
        public StructureKeys()
        {
            
        }

        [Required]
        public int Id { get; set; }

        [Required]
        public int StructureId { get; set; }

        [Required]
        public int ScalePosition { get; set; }

        [Required]
        public int SemitoneVariation { get; set; }

        [Required]
        [StringLength(5)]
        public string Signature { get; set; }
 
        [ForeignKey("StructureId")]
        [InverseProperty("StructureKeysStructure")]
        [IgnoreDataMember]
        [JsonIgnore]
        public virtual Structures Structure { get; set; }

    }
}
