namespace Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Runtime.Serialization;
    using System.ComponentModel.DataAnnotations.Schema;

    public partial class Users
    {
        public Users()
        {
            UserCustomTuningsUser = new HashSet<UserCustomTunings>();
        }

        [Required]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [Required]
        [StringLength(200)]
        public string Email { get; set; }

        [Required]
        [StringLength(100)]
        public string Password { get; set; }

        [Required]
        public DateTime MemberSince { get; set; }


        [InverseProperty("User")]
        [IgnoreDataMember]
        public virtual ICollection<UserCustomTunings> UserCustomTuningsUser { get; set; }
    }
}
