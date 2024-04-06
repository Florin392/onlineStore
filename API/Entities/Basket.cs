using System.Collections.Generic;

namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new();
        //create a new list of items when we create a new basket

        // meth to create/delete items
        public void AddItem(Product product, int quantity)
        // check if the product is not in the list of items
        {
            if (Items.All(item => item.ProductId != product.Id))
            // if it's not in the list, then we're going to add it 
            {
                Items.Add(new BasketItem { Product = product, Quantity = quantity });
            }

            var existingItem = Items.FirstOrDefault(item => item.ProductId == product.Id);
            // gives us the item with is of type basket item
            if (existingItem != null) existingItem.Quantity += quantity;
        }

        public void RemoveItem(int productId, int quantity)
        {
            // get the item
            var item = Items.FirstOrDefault(item => item.ProductId == productId);
            // if is null, then we're not going to be able to reduce it's quantity
            if (item == null) return;
            item.Quantity -= quantity;
            // if quantity = 0
            if (item.Quantity == 0) Items.Remove(item);
        }
    }
}