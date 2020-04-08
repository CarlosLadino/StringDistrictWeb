namespace Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public partial class VW_Frequencies
    {
        public VW_Frequencies()
        {}

        public int Id { get; set; }

        [Column(TypeName = "decimal(8, 4)")]
        public decimal Frequency { get; set; }

        public int? LevelId { get; set; }

        public int? ChromaticNoteId { get; set; }

        [StringLength(1)]
        public string Name { get; set; }

        public bool IsAccidental { get; set; }

        [StringLength(1)]
        public string BemolName { get; set; }

        public int LevelNumber { get; set; }
    }
}
