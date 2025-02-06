using ContactListApp.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactListApp.Data{

    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) {}

        public DbSet<Contact> Contacts { get; set; }
    }
}
