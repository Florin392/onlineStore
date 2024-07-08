using API.Data;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace API.Services
{
    public class BasketService
    {
        private readonly StoreContext _context;

        public BasketService(StoreContext context)
        {
            _context = context;
        }

        public async Task<Basket> RetrieveBasket(string buyerId)
        {
            if (string.IsNullOrEmpty(buyerId))
            {
                return null;
            }

            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
        }

        public string GetBuyerId(ClaimsPrincipal user, HttpRequest request)
        {
            return user.Identity?.Name ?? request.Cookies["buyerId"];
        }

        public Basket CreateBasket(ClaimsPrincipal user, HttpResponse response)
        {
            var buyerId = user.Identity?.Name;
            if (string.IsNullOrEmpty(buyerId))
            {
                buyerId = Guid.NewGuid().ToString();
                var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
                response.Cookies.Append("buyerId", buyerId, cookieOptions);
            }

            var basket = new Basket { BuyerId = buyerId };
            _context.Baskets.Add(basket);
            return basket;
        }
    }
}
