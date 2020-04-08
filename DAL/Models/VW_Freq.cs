namespace Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public partial class VW_Freq
    {
        public VW_Freq()
        {}

        public int Id { get; set; }

        public int TuningTypeId { get; set; }

        public int NoteFrequencyId { get; set; }

        public int StringNumber { get; set; }

        public int StringGauge { get; set; }

        public int StartAtFretNumber { get; set; }
    }
}
