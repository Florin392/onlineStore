using API.Data;
using API.DTOs;
using API.Entities;
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
            var basket = await RetreiveBasket();

            if (basket == null) return NotFound();

            return MapBasketToDto(basket);
        }


        // add item to basket
        [HttpPost] //  api/basket?productId=3&quantity=2
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
        {
            // get baskets || create basket (is the  user doon't have basket)
            var basket = await RetreiveBasket();

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
            if (result) return CreatedAtRoute("GetBasket", MapBasketToDto(basket));

            // save changes
            return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
        }


        // remove item from basket
        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            // should have  a basket
            var basket = await RetreiveBasket();

            if (basket == null) return NotFound();

            // remove the item or reduce quantity
            basket.RemoveItem(productId, quantity);

            // save changes
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem reoving item from the basket" });
        }



        private async Task<Basket> RetreiveBasket()
        {
            return await _context.Baskets
                .Include(i => i.Items)
                // entity framework will include the related items with the basket
                .ThenInclude(p => p.Product)
                // gives us the basket along with the items and the informations about the product 
                .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }

        // return a new basket
        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            //create unique id key
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            var basket = new Basket { BuyerId = buyerId };
            _context.Baskets.Add(basket);
            return basket;
        }

        private BasketDto MapBasketToDto(Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity
                }).ToList()
            };
        }
    }
}