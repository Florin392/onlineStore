using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;
        public BasketController(StoreContext context)
        {
            _context = context;
        }

        // fetch basket
        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket(GetBuyerId());

            if (basket == null) return NotFound();

            return basket.MapBasketToDto();
        }


        // add item to basket
        [HttpPost] //  api/basket?productId=3&quantity=2
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {
            // get baskets || create basket (is the  user doon't have basket)
            var basket = await RetrieveBasket(GetBuyerId());

            // check if basket = null
            if (basket == null) basket = CreateBasket();

            // get products
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return BadRequest(new ProblemDetails { Title = "Product Not Found" });

            // add item
            basket.AddItem(product, quantity);

            // check result
            var result = await _context.SaveChangesAsync() > 0;

            // if < 0 => bad request
            if (result) return CreatedAtRoute("GetBasket", basket.MapBasketToDto());

            // save changes
            return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
        }


        // remove item from basket
        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            // should have  a basket
            var basket = await RetrieveBasket(GetBuyerId());

            if (basket == null) return NotFound();

            // remove the item or reduce quantity
            basket.RemoveItem(productId, quantity);

            // save changes
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem reoving item from the basket" });
        }



        private async Task<Basket> RetrieveBasket(string buyerId)
        {
            // remove the cookie
            if (string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("buyerId");
                return null;
            }

            return await _context.Baskets
                .Include(i => i.Items)
                // entity framework will include the related items with the basket
                .ThenInclude(p => p.Product)
                // gives us the basket along with the items and the informations about the product 
                .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
            // if the buyerId is empty, remove the cookie from the response and use the buyerId
            // to check if we have a basket or compare with the buyer Id we're passing
        }

        private string GetBuyerId()
        {
            return User.Identity?.Name ?? Request.Cookies["buyerId"];
            // check if we have a user = buyerId  or we check if we have a cookie
            // if none of them => line 78 
        }

        // return a new basket
        private Basket CreateBasket()
        // if a user is logged in and we create a basket
        {
            // set the buyerId to the username
            var buyerId = User.Identity?.Name;
            if (string.IsNullOrEmpty(buyerId))
            {
                // if not, set it to a Guid
                buyerId = Guid.NewGuid().ToString();
                var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
                Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            }
            //create unique id key

            var basket = new Basket { BuyerId = buyerId };
            _context.Baskets.Add(basket);
            return basket;
        }
    }
}