using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialMediaApp.Model
{
    public class User
    {
        public int Id { get; set; }
        public string email { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }

        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }
    }
}
