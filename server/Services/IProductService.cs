using ProductCatalogBackend.Models;

namespace ProductCatalogBackend.Services
{
    public interface IProductService
    {
        IEnumerable<Product> GetProducts(int page, int limit, string? search);
        int GetTotalCount(string? search);
    }
}
