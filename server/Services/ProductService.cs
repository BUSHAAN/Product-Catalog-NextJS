using ProductCatalogBackend.Data;
using ProductCatalogBackend.Models;

namespace ProductCatalogBackend.Services
{
    public class ProductService : IProductService
    {
        public IEnumerable<Product> GetProducts(int page, int limit, string? search)
        {
            var query = ProductData.Products.AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(p => p.Title.Contains(search, System.StringComparison.OrdinalIgnoreCase));
            }
            return query
                .Skip((page - 1) * limit)
                .Take(limit)
                .ToList();
        }
        public int GetTotalCount(string? search)
        {
            var query = ProductData.Products.AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(p => p.Title.Contains(search, System.StringComparison.OrdinalIgnoreCase));
            }

            return query.Count();
        }
    }
}
