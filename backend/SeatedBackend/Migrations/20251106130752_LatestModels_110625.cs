using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SeatedBackend.Migrations
{
    /// <inheritdoc />
    public partial class LatestModels_110625 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "name",
                table: "users");

            migrationBuilder.CreateTable(
                name: "venues",
                columns: table => new
                {
                    venue_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    venue_name = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    capacity = table.Column<int>(type: "int", nullable: false),
                    created_at = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    updated_at = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_venues", x => x.venue_id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "events",
                columns: table => new
                {
                    event_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    organizer_id = table.Column<int>(type: "int", nullable: false),
                    venue_id = table.Column<int>(type: "int", nullable: false),
                    event_name = table.Column<string>(type: "varchar(150)", maxLength: 150, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    description = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    event_date = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    start_time = table.Column<TimeSpan>(type: "time(6)", nullable: false),
                    end_time = table.Column<TimeSpan>(type: "time(6)", nullable: false),
                    image_url = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    qr_code = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    status = table.Column<string>(type: "longtext", nullable: false, defaultValue: "pending")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    approval_date = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    created_at = table.Column<DateTime>(type: "datetime(6)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP(6)"),
                    updated_at = table.Column<DateTime>(type: "datetime(6)", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP(6)")
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.ComputedColumn)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_events", x => x.event_id);
                    table.ForeignKey(
                        name: "FK_events_users_organizer_id",
                        column: x => x.organizer_id,
                        principalTable: "users",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_events_venues_venue_id",
                        column: x => x.venue_id,
                        principalTable: "venues",
                        principalColumn: "venue_id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "seats",
                columns: table => new
                {
                    seat_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    venue_id = table.Column<int>(type: "int", nullable: false),
                    seat_row = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    seat_column = table.Column<int>(type: "int", nullable: true),
                    floor_type = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    seat_code = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    is_special = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    status = table.Column<int>(type: "int", nullable: false),
                    created_at = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    updated_at = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_seats", x => x.seat_id);
                    table.ForeignKey(
                        name: "FK_seats_venues_venue_id",
                        column: x => x.venue_id,
                        principalTable: "venues",
                        principalColumn: "venue_id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "reservations",
                columns: table => new
                {
                    reservation_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    user_id = table.Column<int>(type: "int", nullable: false),
                    event_id = table.Column<int>(type: "int", nullable: false),
                    seat_id = table.Column<int>(type: "int", nullable: false),
                    status = table.Column<int>(type: "int", nullable: false),
                    qr_code = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    reserved_at = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    checked_in_at = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_reservations", x => x.reservation_id);
                    table.ForeignKey(
                        name: "FK_reservations_events_event_id",
                        column: x => x.event_id,
                        principalTable: "events",
                        principalColumn: "event_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_reservations_seats_seat_id",
                        column: x => x.seat_id,
                        principalTable: "seats",
                        principalColumn: "seat_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_reservations_users_user_id",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "seat_requests",
                columns: table => new
                {
                    request_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    user_id = table.Column<int>(type: "int", nullable: false),
                    event_id = table.Column<int>(type: "int", nullable: false),
                    seat_id = table.Column<int>(type: "int", nullable: false),
                    status = table.Column<int>(type: "int", nullable: false),
                    requested_at = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_seat_requests", x => x.request_id);
                    table.ForeignKey(
                        name: "FK_seat_requests_events_event_id",
                        column: x => x.event_id,
                        principalTable: "events",
                        principalColumn: "event_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_seat_requests_seats_seat_id",
                        column: x => x.seat_id,
                        principalTable: "seats",
                        principalColumn: "seat_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_seat_requests_users_user_id",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_events_organizer_id",
                table: "events",
                column: "organizer_id");

            migrationBuilder.CreateIndex(
                name: "IX_events_venue_id",
                table: "events",
                column: "venue_id");

            migrationBuilder.CreateIndex(
                name: "IX_reservations_event_id",
                table: "reservations",
                column: "event_id");

            migrationBuilder.CreateIndex(
                name: "IX_reservations_seat_id",
                table: "reservations",
                column: "seat_id");

            migrationBuilder.CreateIndex(
                name: "IX_reservations_user_id",
                table: "reservations",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_seat_requests_event_id",
                table: "seat_requests",
                column: "event_id");

            migrationBuilder.CreateIndex(
                name: "IX_seat_requests_seat_id",
                table: "seat_requests",
                column: "seat_id");

            migrationBuilder.CreateIndex(
                name: "IX_seat_requests_user_id",
                table: "seat_requests",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_seats_venue_id",
                table: "seats",
                column: "venue_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "reservations");

            migrationBuilder.DropTable(
                name: "seat_requests");

            migrationBuilder.DropTable(
                name: "events");

            migrationBuilder.DropTable(
                name: "seats");

            migrationBuilder.DropTable(
                name: "venues");

            migrationBuilder.AddColumn<string>(
                name: "name",
                table: "users",
                type: "varchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
