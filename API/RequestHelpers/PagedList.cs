using Microsoft.EntityFrameworkCore;

namespace API.RequestHelpers
{
    public class PagedList<T> : List<T>
    {
        // constructor
        public PagedList(List<T> items, int count, int pageNumber, int pageSize)
        {
            MetaData = new MetaData
            {
                TotalCount = count,
                PageSize = pageSize,
                CurrentPage = pageNumber,
                TotalPages = (int)Math.Ceiling(count / (double)pageSize),

            };
            AddRange(items);
        }

        // when we create a new instance of out page list,we're going to pass it the list of items,
        // the count, pN, and when we return from this page list or we have this pL, we're going to
        // have all of our metadata and we're going to have the items inside it as well.
        public MetaData MetaData { get; set; }

        public static async Task<PagedList<T>> ToPagedList(IQueryable<T> query,
         int pageNumber, int pageSize)
        {
            var count = await query.CountAsync();
            // at this point out query is going to be executed agains a databes because 
            // we beed to execute this against a DB to find out the total count of items available.

            var items = await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
            // we execute out query agains the DB. if we have a pS=10 and 18 items in DB, and we want 
            // the second page, then pN-1 if we're on pN=2 and pN-1 is 1 * pS=10 => we will skip 10 items and
            // take the next 10 items, but in this case we will have only 8

            return new PagedList<T>(items, count, pageNumber, pageSize);
        }
    }
}

