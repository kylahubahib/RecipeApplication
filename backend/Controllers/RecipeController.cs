using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Application.DTOs;
using backend.Application.Services;
using backend.Domain.Interfaces;
using backend.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class RecipeController : ControllerBase
    {
        private readonly ILogger<RecipeController> _logger;
        private readonly IRecipeServices _service;
        private readonly ValidationServices<IFormFile> _imageValidator;

        public RecipeController(ILogger<RecipeController> logger,
            IRecipeServices service,
            ValidationServices<IFormFile> imageValidator)
        {
            _service = service;
            _logger = logger;
            _imageValidator = imageValidator;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DisplayRecipeDto>>> GetAllAsync()
        {
            var recipes = await _service.GetAllAsync();

            _logger.LogInformation("Fetch Recipes: " + recipes);

            return Ok(recipes);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<IEnumerable<DisplayRecipeDto>>> GetById(int id)
        {
            var recipe = await _service.GetRecipeAsync(id);
            return (recipe == null) ? NotFound() : Ok(recipe);
        }

        [HttpPost]
        public async Task<ActionResult<RecipeDto>> CreateAsync(CreateRecipeDto data)
        {
            if (!_imageValidator.Validate(data.Image) && data.Image != null)
                return BadRequest(new
                {
                    errors = new
                    {
                        Image = new[] { "The image size exceeds the allowed limit (2MB)." }
                    }
                });


            var recipe = await _service.Create(data);
            return CreatedAtAction(nameof(GetById), new { id = recipe.RecipeId }, recipe);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateAsync(UpdateRecipeDto data, int id)
        {
            if (data.Image != null && !_imageValidator.Validate(data.Image))
                return BadRequest(new
                {
                    errors = new
                    {
                        Image = new[] { "The image size exceeds the allowed limit (2MB)." }
                    }
                });


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