using Microsoft.EntityFrameworkCore;
using SocialMediaApp.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocialMediaApp.Data
{
    public class SocialMediaDataContext: DbContext
    {
        public SocialMediaDataContext(DbContextOptions<SocialMediaDataContext> options) : base(options)
        {

        }

        public DbSet<User> User { get; set; }
    }
}
