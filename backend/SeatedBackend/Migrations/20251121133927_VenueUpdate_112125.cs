using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SeatedBackend.Migrations
{
    /// <inheritdoc />
    public partial class VenueUpdate_112125 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "description",
                table: "venues",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "image_url",
                table: "venues",
                type: "varchar(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "status",
                table: "venues",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "description",
                table: "venues");

            migrationBuilder.DropColumn(
                name: "image_url",
                table: "venues");

            migrationBuilder.DropColumn(
                name: "status",
                table: "venues");
        }
    }
}
