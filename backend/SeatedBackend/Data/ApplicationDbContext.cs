using Microsoft.EntityFrameworkCore;
using SeatedBackend.Models;

namespace SeatedBackend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public required DbSet<User> Users { get; set; }
        public required DbSet<Event> Events { get; set; }
        public required DbSet<Reservation> Reservations { get; set; }
        public required DbSet<Seat> Seats { get; set; }
        public required DbSet<SeatRequest> SeatRequests { get; set; }
        public required DbSet<Venue> Venues { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // User Config
            modelBuilder.Entity<User>()
                .Property(u => u.Role)
                .HasConversion(
                    v => v.ToString(),
                    v => Enum.Parse<UserRole>(v)
                )
                .HasDefaultValue(UserRole.Guest);

            modelBuilder.Entity<User>()
                .Property(u => u.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP(6)");

            modelBuilder.Entity<User>()
                .Property(u => u.UpdatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP(6)")
                .ValueGeneratedOnAddOrUpdate();

            // Event Config
            modelBuilder.Entity<Event>()
                .Property(u => u.Status)
                .HasConversion(
                    v => v.ToString(),
                    v => Enum.Parse<EventStatus>(v)
                )
                .HasDefaultValue(EventStatus.Pending);

            modelBuilder.Entity<Event>()
                .Property(u => u.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP(6)");

            modelBuilder.Entity<Event>()
                .Property(u => u.UpdatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP(6)")
                .ValueGeneratedOnAddOrUpdate();

            // Seat Config
            modelBuilder.Entity<Seat>()
                .Property(u => u.Status)
                .HasConversion(
                    v => v.ToString(),
                    v => Enum.Parse<SeatStatus>(v)
                )
                .HasDefaultValue(SeatStatus.Available);

            modelBuilder.Entity<Seat>()
                .Property(u => u.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP(6)");

            modelBuilder.Entity<Seat>()
                .Property(u => u.UpdatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP(6)")
                .ValueGeneratedOnAddOrUpdate();

            // Reservation Config
            modelBuilder.Entity<Reservation>()
                .Property(u => u.Status)
                .HasConversion(
                    v => v.ToString(),
                    v => Enum.Parse<ReservationStatus>(v)
                )
                .HasDefaultValue(ReservationStatus.Reserved);

            // SeatRequest Config
            modelBuilder.Entity<SeatRequest>()
                .Property(u => u.Status)
                .HasConversion(
                    v => v.ToString(),
                    v => Enum.Parse<SeatRequestStatus>(v)
                )
                .HasDefaultValue(SeatRequestStatus.Pending);


            // Relationships
            // User - Events
            modelBuilder.Entity<Event>()
                .HasOne(e => e.User)
                .WithMany(u => u.Events)
                .HasForeignKey(e => e.OrganizerId)
                .OnDelete(DeleteBehavior.Restrict);

            // Venue - Events
            modelBuilder.Entity<Event>()
                .HasOne(e => e.Venue)
                .WithMany(v => v.Events)
                .HasForeignKey(e => e.VenueId)
                .OnDelete(DeleteBehavior.Cascade);

            // Venue - Seats
            modelBuilder.Entity<Venue>()
                .HasMany(v => v.Seats)
                .WithOne(s => s.Venue)
                .HasForeignKey(s => s.VenueId)
                .OnDelete(DeleteBehavior.Cascade);

            // User - Reservations
            modelBuilder.Entity<Reservation>()
                .HasOne(r => r.User)
                .WithMany(u => u.Reservations)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Event - Reservations
            modelBuilder.Entity<Reservation>()
                .HasOne(r => r.Event)
                .WithMany(e => e.Reservations)
                .HasForeignKey(r => r.EventId)
                .OnDelete(DeleteBehavior.Cascade);

            // Seat - Reservations
            modelBuilder.Entity<Reservation>()
                .HasOne(r => r.Seat)
                .WithMany(u => u.Reservations)
                .HasForeignKey(r => r.SeatId)
                .OnDelete(DeleteBehavior.Restrict);

            // User - SeatRequests
            modelBuilder.Entity<SeatRequest>()
                .HasOne(sr => sr.User)
                .WithMany(u => u.SeatRequests)
                .HasForeignKey(sr => sr.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Event - SeatRequests
            modelBuilder.Entity<SeatRequest>()
                .HasOne(sr => sr.Event)
                .WithMany(e => e.SeatRequests)
                .HasForeignKey(sr => sr.EventId)
                .OnDelete(DeleteBehavior.Cascade);

            // Seat - SeatRequests
            modelBuilder.Entity<SeatRequest>()
                .HasOne(sr => sr.Seat)
                .WithMany(s => s.SeatRequests)
                .HasForeignKey(sr => sr.SeatId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
