using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class NewDatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Products");

            migrationBuilder.Sql(@"
                INSERT INTO Products (Name, Description, Price, PictureUrl, Brand, Type, QuantityInStock) VALUES
                ('Monstera Deliciosa', 'A popular indoor plant with large, distinctive split leaves. The Monstera Deliciosa is perfect for adding a tropical touch to your home. Its unique fenestrations make it a focal point in any room.', 2599, '/images/products/m-o1.png', 'GreenThumb', 'Indoor Plant', 100),
                ('Monstera Adansonii', 'Known as the Swiss Cheese Plant, the Monstera Adansonii has unique perforated leaves that add a decorative touch to any space. It''s a climbing plant that thrives in bright, indirect light.', 1999, '/images/products/monstera-adansonii.jpeg', 'GreenThumb', 'Climbing Plant', 100),
                ('Monstera Peru', 'An easy-to-care-for plant with thick, leathery leaves that display unique texture and patterns. The Monstera Peru is ideal for both beginners and experienced plant enthusiasts.', 2299, '/images/products/monstera-peru.jpg', 'GreenThumb', 'Indoor Plant', 100),
                ('Monstera Dubia', 'A climbing Monstera with beautiful variegated leaves. The Monstera Dubia is ideal for vertical gardening or as a unique indoor accent, adding a touch of the jungle to your home.', 2999, '/images/products/monstera-dubia.jpg', 'GreenThumb', 'Climbing Plant', 100),
                ('Monstera Siltepecana', 'A rare Monstera with silver-blue leaves that develop fenestrations as it matures. Monstera Siltepecana is great for hanging baskets and adds a unique element to any plant collection.', 2499, '/images/products/monstera-siltepecana.jpg', 'GreenThumb', 'Climbing Plant', 100),
                ('Monstera Pinnatipartita', 'A climbing Monstera with deeply lobed leaves. The Monstera Pinnatipartita adds a touch of the jungle to any indoor space and is perfect for plant lovers looking to expand their collection.', 2799, '/images/products/monstera-pinnatipartita.jpg', 'GreenThumb', 'Climbing Plant', 100),
                ('Cactus Echinopsis', 'A hardy cactus with stunning, large blooms that come in various colors. The Echinopsis cactus is perfect for sunny windowsills and adds a touch of desert charm to your home.', 1599, '/images/products/cactus-echinopsis.jpg', 'DesertBloom', 'Cactus', 100),
                ('Cactus Opuntia', 'Also known as Prickly Pear, this cactus has unique paddle-shaped stems and vibrant flowers. The Opuntia cactus is an excellent addition to any cactus collection.', 1899, '/images/products/cactus-opuntia.jpg', 'DesertBloom', 'Cactus', 100),
                ('Cactus Mammillaria', 'A charming small cactus with a spherical shape, often adorned with beautiful small flowers. Mammillaria cacti are perfect for small spaces and cactus gardens.', 1299, '/images/products/cactus-mammillaria.jpg', 'DesertBloom', 'Cactus', 100),
                ('Cactus Astrophytum', 'Known as the Star Cactus, it has a unique star-like shape and often features white speckles on its surface. The Astrophytum cactus is a must-have for any cactus enthusiast.', 2199, '/images/products/cactus-astrophytum.jpg', 'DesertBloom', 'Cactus', 100),
                ('Alocasia Polly', 'A striking plant with arrowhead-shaped leaves and distinctive white veins. Alocasia Polly is perfect for adding a touch of the exotic to any room.', 2999, '/images/products/alocasia-polly.jpg', 'GreenLeaf', 'Indoor Plant', 100),
                ('Alocasia Zebrina', 'Known for its unique zebra-striped stems and large, glossy leaves. Alocasia Zebrina is a real conversation starter and adds a unique flair to your plant collection.', 3499, '/images/products/alocasia-zebrina.jpg', 'GreenLeaf', 'Indoor Plant', 100),
                ('Alocasia Black Velvet', 'A rare Alocasia with dark, velvety leaves and contrasting white veins. Alocasia Black Velvet is perfect for plant collectors looking for something unique.', 3999, '/images/products/alocasia-black-velvet.jpg', 'GreenLeaf', 'Rare Plant', 100),
                ('Alocasia Frydek', 'Features large, heart-shaped leaves with bright white veins. Alocasia Frydek adds a tropical feel to any space and is a favorite among plant enthusiasts.', 3299, '/images/products/alocasia-frydek.jpg', 'GreenLeaf', 'Indoor Plant', 100),
                ('Syngonium Podophyllum', 'An easy-to-care-for plant with arrowhead-shaped leaves that start out white and turn green with age. Syngonium Podophyllum is perfect for beginners.', 1499, '/images/products/syngonium-podophyllum.jpg', 'LeafyGreens', 'Air Purifying Plant', 100),
                ('Syngonium Albo Variegata', 'A rare Syngonium with stunning white variegation on its leaves. Syngonium Albo Variegata is perfect for collectors looking for a unique addition to their collection.', 3599, '/images/products/syngonium-albo-variegata.jpg', 'LeafyGreens', 'Rare Plant', 100),
                ('Syngonium Neon Robusta', 'Features vibrant pink leaves that add a pop of color to any indoor space. Syngonium Neon Robusta is perfect for brightening up your home.', 1999, '/images/products/syngonium-neon-robusta.jpg', 'LeafyGreens', 'Indoor Plant', 100),
                ('Syngonium Confetti', 'A unique plant with pink and green speckled leaves. Syngonium Confetti adds a festive touch to your plant collection.', 2299, '/images/products/syngonium-confetti.jpg', 'LeafyGreens', 'Indoor Plant', 100),
                ('Syngonium Strawberry Cream', 'A beautiful Syngonium with cream-colored leaves tinged with pink. Syngonium Strawberry Cream is ideal for brightening up any space.', 2499, '/images/products/syngonium-strawberry-cream.jpg', 'LeafyGreens', 'Indoor Plant', 100),
                ('Philodendron Birkin', 'A striking plant with dark green leaves adorned with white pinstripes. Philodendron Birkin is perfect for indoor decoration and adds a touch of elegance to any room.', 2699, '/images/products/philodendron-birkin.jpg', 'GreenWorld', 'Indoor Plant', 100),
                ('Fiddle Leaf Fig', 'Known for its large, glossy leaves, the Fiddle Leaf Fig makes a bold statement in any room. It''s a popular choice for interior designers and plant enthusiasts alike.', 4999, '/images/products/fidd-leleaf-fig.jpg', 'GreenWorld', 'Air Purifying Plant', 100),
                ('ZZ Plant', 'An easy-care plant with glossy, dark green leaves. The ZZ Plant is perfect for low light conditions and is known for its resilience and air-purifying qualities.', 2099, '/images/products/zz-plant.jpg', 'GreenWorld', 'Air Purifying Plant', 100),
                ('Pothos Golden', 'A hardy plant with trailing vines and heart-shaped leaves variegated with gold. Pothos Golden is perfect for beginners and adds a lush touch to any space.', 1499, '/images/products/pothos-golden.jpg', 'GreenWorld', 'Indoor Plant', 100),
                ('Snake Plant', 'Also known as Mother-in-Law''s Tongue, this plant features tall, upright leaves with striking yellow edges. The Snake Plant is perfect for air purification and low light conditions.', 1899, '/images/products/snake-plant.jpg', 'GreenWorld', 'Air Purifying Plant', 100),
                ('Spider Plant', 'A popular plant with arching green and white striped leaves. The Spider Plant is perfect for hanging baskets and is known for its air-purifying properties.', 1299, '/images/products/spider-plant.jpg', 'GreenWorld', 'Air Purifying Plant', 100),
                ('Calathea Medallion', 'Features large, rounded leaves with a striking pattern of green and purple. Calathea Medallion adds a tropical touch and is perfect for shaded areas.', 2499, '/images/products/calathea-medallion.jpg', 'GreenWorld', 'Indoor Plant', 100),
                ('Peace Lily', 'Known for its elegant white flowers and dark green leaves, the Peace Lily is great for purifying indoor air. It''s a low-maintenance plant perfect for any home.', 1699, '/images/products/peace-lily.jpg', 'GreenWorld', 'Air Purifying Plant', 100),
                ('Dieffenbachia', 'A striking plant with large, patterned leaves. Dieffenbachia adds a tropical feel to any indoor space and is easy to care for.', 2199, '/images/products/dieffenbachia.jpg', 'GreenWorld', 'Indoor Plant', 100),
                ('Rubber Plant', 'Features large, glossy leaves that are perfect for adding a bold touch to your indoor garden. The Rubber Plant is a popular choice for its ease of care and striking appearance.', 2399, '/images/products/rubber-plant.jpg', 'GreenWorld', 'Air Purifying Plant', 100),
                ('Variegated Monstera', 'A rare Monstera with striking variegated leaves. The Variegated Monstera is highly sought after by collectors and adds a unique touch to any plant collection.', 14999, '/images/products/variegated-monstera.jpg', 'RareFinds', 'Rare Plant', 50),
                ('Philodendron Pink Princess', 'A rare Philodendron with stunning pink variegation on its leaves. The Pink Princess is perfect for collectors looking for a unique and beautiful addition to their collection.', 9999, '/images/products/philodendron-pink-princess.jpg', 'RareFinds', 'Rare Plant', 50),
                ('Monstera Obliqua', 'One of the rarest Monstera species, known for its delicate, fenestrated leaves. The Monstera Obliqua is a true collector''s item and adds an exotic touch to any collection.', 19999, '/images/products/monstera-obliqua.jpg', 'RareFinds', 'Rare Plant', 20),
                ('Philodendron Melanochrysum', 'A rare Philodendron with velvety, dark green leaves that have a golden sheen. The Melanochrysum is a stunning addition to any rare plant collection.', 12999, '/images/products/philodendron-melanochrysum.jpg', 'RareFinds', 'Rare Plant', 30),
                ('Anthurium Clarinervium', 'A rare Anthurium with striking heart-shaped leaves and prominent white veins. The Clarinervium is perfect for collectors looking for a unique and beautiful plant.', 8999, '/images/products/anthurium-clarinervium.jpg', 'RareFinds', 'Rare Plant', 40);
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
