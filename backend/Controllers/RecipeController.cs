using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Application.DTOs;
using backend.Application.Services;
using backend.Domain.Interfaces;
using backend.Domain.Models;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecipeController : ControllerBase
    {
        private readonly ILogger<RecipeController> _logger;
        private readonly IRecipeServices _service;

        public RecipeController( ILogger<RecipeController> logger, IRecipeServices service)
        {
            _service = service;
            _logger = logger;
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
        public async Task<ActionResult<RecipeDto>> CreateAsync(RecipeDto data)
        {
            //Add validations here
            var recipe = await _service.Create(data);
            return CreatedAtAction(nameof(GetById), new { id = recipe.RecipeId }, recipe);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateAsync(RecipeDto data, int id)
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