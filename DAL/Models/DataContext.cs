namespace Data.Models
{
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.Data.SqlClient;
    using System.Linq;

    public partial class DataContext : DbContext
    {
        public DataContext()
        {
        }

        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }

        // Tables
        public virtual DbSet<ChromaticNotes> ChromaticNotes { get; set; }
        public virtual DbSet<Instruments> Instruments { get; set; }
        public virtual DbSet<InstrumentTuningTypeChromaticNotes> InstrumentTuningTypeChromaticNotes { get; set; }
        public virtual DbSet<Levels> Levels { get; set; }
        public virtual DbSet<NoteFrequencies> NoteFrequencies { get; set; }
        public virtual DbSet<SiteVisitors> SiteVisitors { get; set; }
        public virtual DbSet<StructureKeys> StructureKeys { get; set; }
        public virtual DbSet<Structures> Structures { get; set; }
        public virtual DbSet<StructureTypes> StructureTypes { get; set; }
        public virtual DbSet<TuningTypes> TuningTypes { get; set; }
        public virtual DbSet<UserCustomTuningNotes> UserCustomTuningNotes { get; set; }
        public virtual DbSet<UserCustomTunings> UserCustomTunings { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        // Views


        // Stored Procedures

    }
}
