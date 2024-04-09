namespace API.RequestHelpers
{
    public class ProductParams : PaginationParams
    // adding properties of PaginationParams also
    {
        public string OrderBy { get; set; }

        public string SearchTerm { get; set; }
        public string Types { get; set; }
        public string Brands { get; set; }
    }
}