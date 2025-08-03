using Microsoft.AspNetCore.Mvc;
using ProductCatalogBackend.Data;
using ProductCatalogBackend.Models;
using ProductCatalogBackend.Services;

namespace ProductCatalogBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {

        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public IActionResult GetProducts([FromQuery] int page = 1, [FromQuery] int limit = 10, [FromQuery] string? search = null)
        {
            var total = _productService.GetTotalCount(search);
            var products = _productService.GetProducts(page, limit, search);

            return Ok(new
            {
                total,
                page,
                limit,
                data = products
            });
        }
    }
}
