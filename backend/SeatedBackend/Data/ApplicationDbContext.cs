using Microsoft.EntityFrameworkCore;
using SeatedBackend.Models;

namespace SeatedBackend.Data
{
  public class ApplicationDbContext : DbContext
  {
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public required DbSet<User> Users { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<User>()
          .Property(u => u.Role)
          .HasConversion(
              v => v.ToString().ToLower(),
              v => Enum.Parse<UserRole>(v, true)
          )
          .HasDefaultValue(UserRole.Guest);

      modelBuilder.Entity<User>()
          .Property(u => u.CreatedAt)
          .HasDefaultValueSql("CURRENT_TIMESTAMP(6)");

      modelBuilder.Entity<User>()
          .Property(u => u.UpdatedAt)
          .HasDefaultValueSql("CURRENT_TIMESTAMP(6)")
          .ValueGeneratedOnAddOrUpdate();
    }
  } 
}
