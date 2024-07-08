namespace API.Entities
{
    public class UserAddress : Address
    {
        public int Id { get; set; }
        public bool SaveAddress { get; set; }
    }
}
