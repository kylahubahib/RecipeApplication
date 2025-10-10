using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Application.DTOs;
using backend.Application.Services;
using backend.Application.Interfaces;
using backend.Domain.Models;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ILogger<CategoryController> _logger;
        private readonly ICategoryServices _service;

        public CategoryController( ILogger<CategoryController> logger, ICategoryServices service)
        {
            _service = service;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetAllAsync()
        {
            var categories = await _service.GetAllAsync();

            _logger.LogInformation("Fetch Recipes: " + categories);

            return Ok(categories);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<IEnumerable<Category>>> GetById(int id)
        {
            var category = await _service.GetCategoryAsync(id);
            return (category == null) ? NotFound() : Ok(category);
        }

        [HttpPost]
        public async Task<ActionResult<Category>> CreateAsync(Category data)
        {
            //Add validations here
            var category = await _service.Create(data);
            return CreatedAtAction(nameof(GetById), new { id = category.CategoryId }, category);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateAsync(Category data, int id)
        {
            var success = await _service.Update(data, id);
            return success ? NoContent() : NotFound();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var success = await _service.Delete(id);
            return success ? NoContent() : NotFound();
        }
    }
}