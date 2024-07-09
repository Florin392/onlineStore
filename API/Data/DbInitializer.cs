using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using System.Linq;

namespace API.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(StoreContext context, UserManager<User> userManager, IConfiguration configuration)
        {
            if (!userManager.Users.Any())
            {
                var userPassword = configuration["UserSettings:DefaultUserPassword"];
                var adminPassword = configuration["UserSettings:DefaultAdminPassword"];

                var user = new User
                {
                    UserName = "bob",
                    Email = "bob@test.com",
                    SecurityStamp = Guid.NewGuid().ToString()
                };

                await userManager.CreateAsync(user, userPassword);
                await userManager.AddToRoleAsync(user, "Member");

                var admin = new User
                {
                    UserName = "admin",
                    Email = "admin@test.com",
                    SecurityStamp = Guid.NewGuid().ToString()
                };

                await userManager.CreateAsync(admin, adminPassword);
                await userManager.AddToRolesAsync(admin, new[] { "Member", "Admin" });
            }

            if (context.Products.Any()) return;

            var products = ProductData.GetProducts();

            context.Products.AddRange(products);
            context.SaveChanges();
        }
    }
}
