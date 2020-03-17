namespace Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;
    using System.ComponentModel.DataAnnotations.Schema;

    public partial class StructureTypes
    {
        public StructureTypes()
        {
            StructuresStructureType = new HashSet<Structures>();
        }

        [Required]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }


        [InverseProperty("StructureType")]
        [IgnoreDataMember]
        public virtual ICollection<Structures> StructuresStructureType { get; set; }
    }
}
