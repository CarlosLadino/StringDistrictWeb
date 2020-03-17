namespace Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;
    using System.ComponentModel.DataAnnotations.Schema;

    public partial class Structures
    {
        public Structures()
        {
            StructureKeysStructure = new HashSet<StructureKeys>();
        }

        [Required]
        public int Id { get; set; }

        [Required]
        public int StructureTypeId { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [Required]
        public bool IsArchived { get; set; }

        [Required]
        public int OrderNumber { get; set; }

        [Required]
        [StringLength(50)]
        public string Signature { get; set; }
 
        [ForeignKey("StructureTypeId")]
        [InverseProperty("StructuresStructureType")]
        [IgnoreDataMember]
        public virtual StructureTypes StructureType { get; set; }

        [InverseProperty("Structure")]
        [IgnoreDataMember]
        public virtual ICollection<StructureKeys> StructureKeysStructure { get; set; }
    }
}
