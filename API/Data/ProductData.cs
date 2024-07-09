using API.Entities;
using System.Collections.Generic;
namespace API.Data
{
    public static class ProductData
    {
        public static List<Product> GetProducts()
        {
            return new List<Product>
            {
                new Product
                {
                    Name = "Monstera Deliciosa",
                    Description = "A popular indoor plant with large, distinctive split leaves. The Monstera Deliciosa is perfect for adding a tropical touch to your home. Its unique fenestrations make it a focal point in any room.",
                    Price = 2599,
                    PictureUrl = "/images/products/m-o1.png",
                    Brand = "GreenThumb",
                    Type = "Indoor Plant",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Monstera Adansonii",
                    Description = "Known as the Swiss Cheese Plant, the Monstera Adansonii has unique perforated leaves that add a decorative touch to any space. It's a climbing plant that thrives in bright, indirect light.",
                    Price = 1999,
                    PictureUrl = "/images/products/monstera-adansonii.jpeg",
                    Brand = "GreenThumb",
                    Type = "Climbing Plant",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Monstera Peru",
                    Description = "An easy-to-care-for plant with thick, leathery leaves that display unique texture and patterns. The Monstera Peru is ideal for both beginners and experienced plant enthusiasts.",
                    Price = 2299,
                    PictureUrl = "/images/products/monstera-peru.jpg",
                    Brand = "GreenThumb",
                    Type = "Indoor Plant",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Monstera Dubia",
                    Description = "A climbing Monstera with beautiful variegated leaves. The Monstera Dubia is ideal for vertical gardening or as a unique indoor accent, adding a touch of the jungle to your home.",
                    Price = 2999,
                    PictureUrl = "/images/products/monstera-dubia.jpg",
                    Brand = "GreenThumb",
                    Type = "Climbing Plant",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Monstera Siltepecana",
                    Description = "A rare Monstera with silver-blue leaves that develop fenestrations as it matures. Monstera Siltepecana is great for hanging baskets and adds a unique element to any plant collection.",
                    Price = 2499,
                    PictureUrl = "/images/products/monstera-siltepecana.jpg",
                    Brand = "GreenThumb",
                    Type = "Climbing Plant",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Monstera Pinnatipartita",
                    Description = "A climbing Monstera with deeply lobed leaves. The Monstera Pinnatipartita adds a touch of the jungle to any indoor space and is perfect for plant lovers looking to expand their collection.",
                    Price = 2799,
                    PictureUrl = "/images/products/monstera-pinnatipartita.jpg",
                    Brand = "GreenThumb",
                    Type = "Climbing Plant",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Cactus Echinopsis",
                    Description = "A hardy cactus with stunning, large blooms that come in various colors. The Echinopsis cactus is perfect for sunny windowsills and adds a touch of desert charm to your home.",
                    Price = 1599,
                    PictureUrl = "/images/products/cactus-echinopsis.jpg",
                    Brand = "DesertBloom",
                    Type = "Cactus",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Cactus Opuntia",
                    Description = "Also known as Prickly Pear, this cactus has unique paddle-shaped stems and vibrant flowers. The Opuntia cactus is an excellent addition to any cactus collection.",
                    Price = 1899,
                    PictureUrl = "/images/products/cactus-opuntia.jpg",
                    Brand = "DesertBloom",
                    Type = "Cactus",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Cactus Mammillaria",
                    Description = "A charming small cactus with a spherical shape, often adorned with beautiful small flowers. Mammillaria cacti are perfect for small spaces and cactus gardens.",
                    Price = 1299,
                    PictureUrl = "/images/products/cactus-mammillaria.jpg",
                    Brand = "DesertBloom",
                    Type = "Cactus",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Cactus Astrophytum",
                    Description = "Known as the Star Cactus, it has a unique star-like shape and often features white speckles on its surface. The Astrophytum cactus is a must-have for any cactus enthusiast.",
                    Price = 2199,
                    PictureUrl = "/images/products/cactus-astrophytum.jpg",
                    Brand = "DesertBloom",
                    Type = "Cactus",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Alocasia Polly",
                    Description = "A striking plant with arrowhead-shaped leaves and distinctive white veins. Alocasia Polly is perfect for adding a touch of the exotic to any room.",
                    Price = 2999,
                    PictureUrl = "/images/products/alocasia-polly.jpg",
                    Brand = "GreenLeaf",
                    Type = "Indoor Plant",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Alocasia Zebrina",
                    Description = "Known for its unique zebra-striped stems and large, glossy leaves. Alocasia Zebrina is a real conversation starter and adds a unique flair to your plant collection.",
                    Price = 3499,
                    PictureUrl = "/images/products/alocasia-zebrina.jpg",
                    Brand = "GreenLeaf",
                    Type = "Indoor Plant",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Alocasia Black Velvet",
                    Description = "A rare Alocasia with dark, velvety leaves and contrasting white veins. Alocasia Black Velvet is perfect for plant collectors looking for something unique.",
                    Price = 3999,
                    PictureUrl = "/images/products/alocasia-black-velvet.jpg",
                    Brand = "GreenLeaf",
                    Type = "Rare Plant",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Alocasia Frydek",
                    Description = "Features large, heart-shaped leaves with bright white veins. Alocasia Frydek adds a tropical feel to any space and is a favorite among plant enthusiasts.",
                    Price = 3299,
                    PictureUrl = "/images/products/alocasia-frydek.jpg",
                    Brand = "GreenLeaf",
                    Type = "Indoor Plant",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Syngonium Podophyllum",
                    Description = "An easy-to-care-for plant with arrowhead-shaped leaves that start out white and turn green with age. Syngonium Podophyllum is perfect for beginners.",
                    Price = 1499,
                    PictureUrl = "/images/products/syngonium-podophyllum.jpg",
                    Brand = "LeafyGreens",
                    Type = "Air Purifying Plant",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Syngonium Albo Variegata",
                    Description = "A rare Syngonium with stunning white variegation on its leaves. Syngonium Albo Variegata is perfect for collectors looking for a unique addition to their collection.",
                    Price = 3599,
                    PictureUrl = "/images/products/syngonium-albo-variegata.jpg",
                    Brand = "LeafyGreens",
                    Type = "Rare Plant",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Syngonium Neon Robusta",
                    Description = "Features vibrant pink leaves that add a pop of color to any indoor space. Syngonium Neon Robusta is perfect for brightening up your home.",
                    Price = 1999,
                    PictureUrl = "/images/products/syngonium-neon-robusta.jpg",
                    Brand = "LeafyGreens",
                    Type = "Indoor Plant",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Syngonium Confetti",
                    Description = "A unique plant with pink and green speckled leaves. Syngonium Confetti adds a festive touch to your plant collection.",
                    Price = 2299,
                    PictureUrl = "/images/products/syngonium-confetti.jpg",
                    Brand = "LeafyGreens",
                    Type = "Indoor Plant",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Syngonium Strawberry Cream",
                    Description = "A beautiful Syngonium with cream-colored leaves tinged with pink. Syngonium Strawberry Cream is ideal for brightening up any space.",
                    Price = 2499,
                    PictureUrl = "/images/products/syngonium-strawberry-cream.jpg",
                    Brand = "LeafyGreens",
                    Type = "Indoor Plant",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Philodendron Birkin",
                    Description = "A striking plant with dark green leaves adorned with white pinstripes. Philodendron Birkin is perfect for indoor decoration and adds a touch of elegance to any room.",
                    Price = 2699,
                    PictureUrl = "/images/products/philodendron-birkin.jpg",
                    Brand = "GreenWorld",
                    Type = "Indoor Plant",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Fiddle Leaf Fig",
                    Description = "Known for its large, glossy leaves, the Fiddle Leaf Fig makes a bold statement in any room. It's a popular choice for interior designers and plant enthusiasts alike.",
                    Price = 4999,
                    PictureUrl = "/images/products/fidd-leleaf-fig.jpg",
                    Brand = "GreenWorld",
                    Type = "Air Purifying Plant",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "ZZ Plant",
                    Description = "An easy-care plant with glossy, dark green leaves. The ZZ Plant is perfect for low light conditions and is known for its resilience and air-purifying qualities.",
                    Price = 2099,
                    PictureUrl = "/images/products/zz-plant.jpg",
                    Brand = "GreenWorld",
                    Type = "Air Purifying Plant",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Pothos Golden",
                    Description = "A hardy plant with trailing vines and heart-shaped leaves variegated with gold. Pothos Golden is perfect for beginners and adds a lush touch to any space.",
                    Price = 1499,
                    PictureUrl = "/images/products/pothos-golden.jpg",
                    Brand = "GreenWorld",
                    Type = "Indoor Plant",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Snake Plant",
                    Description = "Also known as Mother-in-Law's Tongue, this plant features tall, upright leaves with striking yellow edges. The Snake Plant is perfect for air purification and low light conditions.",
                    Price = 1899,
                    PictureUrl = "/images/products/snake-plant.jpg",
                    Brand = "GreenWorld",
                    Type = "Air Purifying Plant",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Spider Plant",
                    Description = "A popular plant with arching green and white striped leaves. The Spider Plant is perfect for hanging baskets and is known for its air-purifying properties.",
                    Price = 1299,
                    PictureUrl = "/images/products/spider-plant.jpg",
                    Brand = "GreenWorld",
                    Type = "Air Purifying Plant",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Calathea Medallion",
                    Description = "Features large, rounded leaves with a striking pattern of green and purple. Calathea Medallion adds a tropical touch and is perfect for shaded areas.",
                    Price = 2499,
                    PictureUrl = "/images/products/calathea-medallion.jpg",
                    Brand = "GreenWorld",
                    Type = "Indoor Plant",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Peace Lily",
                    Description = "Known for its elegant white flowers and dark green leaves, the Peace Lily is great for purifying indoor air. It's a low-maintenance plant perfect for any home.",
                    Price = 1699,
                    PictureUrl = "/images/products/peace-lily.jpg",
                    Brand = "GreenWorld",
                    Type = "Air Purifying Plant",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Dieffenbachia",
                    Description = "A striking plant with large, patterned leaves. Dieffenbachia adds a tropical feel to any indoor space and is easy to care for.",
                    Price = 2199,
                    PictureUrl = "/images/products/dieffenbachia.jpg",
                    Brand = "GreenWorld",
                    Type = "Indoor Plant",
                    QuantityInStock = 100
                },

                new Product
                {
                    Name = "Rubber Plant",
                    Description = "Features large, glossy leaves that are perfect for adding a bold touch to your indoor garden. The Rubber Plant is a popular choice for its ease of care and striking appearance.",
                    Price = 2399,
                    PictureUrl = "/images/products/rubber-plant.jpg",
                    Brand = "GreenWorld",
                    Type = "Air Purifying Plant",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Variegated Monstera",
                    Description = "A rare Monstera with striking variegated leaves. The Variegated Monstera is highly sought after by collectors and adds a unique touch to any plant collection.",
                    Price = 14999,
                    PictureUrl = "/images/products/variegated-monstera.jpg",
                    Brand = "RareFinds",
                    Type = "Rare Plant",
                    QuantityInStock = 50
                },
                new Product
                {
                    Name = "Philodendron Pink Princess",
                    Description = "A rare Philodendron with stunning pink variegation on its leaves. The Pink Princess is perfect for collectors looking for a unique and beautiful addition to their collection.",
                    Price = 9999,
                    PictureUrl = "/images/products/philodendron-pink-princess.jpg",
                    Brand = "RareFinds",
                    Type = "Rare Plant",
                    QuantityInStock = 50
                },
                new Product
                {
                    Name = "Monstera Obliqua",
                    Description = "One of the rarest Monstera species, known for its delicate, fenestrated leaves. The Monstera Obliqua is a true collector's item and adds an exotic touch to any collection.",
                    Price = 19999,
                    PictureUrl = "/images/products/monstera-obliqua.jpg",
                    Brand = "RareFinds",
                    Type = "Rare Plant",
                    QuantityInStock = 20
                },
                new Product
                {
                    Name = "Philodendron Melanochrysum",
                    Description = "A rare Philodendron with velvety, dark green leaves that have a golden sheen. The Melanochrysum is a stunning addition to any rare plant collection.",
                    Price = 12999,
                    PictureUrl = "/images/products/philodendron-melanochrysum.jpg",
                    Brand = "RareFinds",
                    Type = "Rare Plant",
                    QuantityInStock = 30
                },
                new Product
                {
                    Name = "Anthurium Clarinervium",
                    Description = "A rare Anthurium with striking heart-shaped leaves and prominent white veins. The Clarinervium is perfect for collectors looking for a unique and beautiful plant.",
                    Price = 8999,
                    PictureUrl = "/images/products/anthurium-clarinervium.jpg",
                    Brand = "RareFinds",
                    Type = "Rare Plant",
                    QuantityInStock = 40
                }
            };
        }
    }
}