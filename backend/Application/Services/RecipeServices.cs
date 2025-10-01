using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using backend.Application.DTOs;
using backend.Domain.Interfaces;
using backend.Domain.Models;
using backend.Infrastructure.Context;
using Microsoft.AspNetCore.Mvc; 
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace backend.Application.Services
{
    public class RecipeServices : IRecipeServices
    {
        private readonly ILogger<RecipeServices> _logger;
        private readonly IConvertImageServices _convert;
        private readonly AppDbContext _db;


        public RecipeServices(ILogger<RecipeServices> logger, AppDbContext db, IConvertImageServices convert)
        {
            _logger = logger;
            _db = db;
            _convert = convert;
        }

         public async Task<IEnumerable<DisplayRecipeDto>> GetAllAsync()
        {

            return await _db.Recipes
                .Include(r => r.Category)
                .Select(r => new DisplayRecipeDto
                {
                    RecipeId = r.RecipeId,
                    CategoryId = r.CategoryId,
                    Title = r.Title,
                    Description = r.Description,
                    Instruction = r.Instruction,
                    Image = _convert.ConvertToString(r.Image),
                    CreatedAt = r.CreatedAt,
                    CategoryName = r.Category != null ? r.Category.CategoryName : "Anonymous"
                })
            .ToListAsync();
        }

        public async Task<DisplayRecipeDto?> GetRecipeAsync(int id)
        {
            return await _db.Recipes
                .Include(r => r.Category)
                .Where(r => r.RecipeId == id)
                .Select(r => new DisplayRecipeDto
                {
                    RecipeId = r.RecipeId,
                    CategoryId = r.CategoryId,
                    Title = r.Title,
                    Description = r.Description,
                    Instruction = r.Instruction,
                    Image = _convert.ConvertToString(r.Image),
                    CreatedAt = r.CreatedAt,
                    CategoryName = r.Category != null ? r.Category.CategoryName : "Anonymous",
                    UserId = r.UserId
                })
            .FirstOrDefaultAsync();
        }
        public async Task<Recipe> Create(CreateRecipeDto data)
        {
            var img = _convert.ConvertToBytes(data.Image);

            var newRecipe = new Recipe
            {
                RecipeId = data.RecipeId,
                CategoryId = data.CategoryId,
                Title = data.Title,
                Description = data.Description,
                Instruction = data.Instruction,
                Image = img,
                CreatedAt = data.CreatedAt,
                UserId = data.UserId
            };

          _logger.LogInformation(JsonSerializer.Serialize(newRecipe));
            
            await _db.Recipes.AddAsync(newRecipe);
            await _db.SaveChangesAsync();

            return newRecipe;
        }

        public async Task<bool> Update(UpdateRecipeDto dto, int id)
        {
            var recipe = await _db.Recipes.FirstOrDefaultAsync(r => r.RecipeId == id);
            if (recipe == null) return false;

            recipe.CategoryId = dto.CategoryId;
            recipe.Title = dto.Title;
            recipe.Description = dto.Description;
            recipe.Instruction = dto.Instruction;
            recipe.UserId = dto.UserId;

            if (dto.Image != null)
            {
                recipe.Image = _convert.ConvertToBytes(dto.Image);
            }

            await _db.SaveChangesAsync();
            return true;
        }


        public async Task<bool> Delete(int id)
        {
            var item = await _db.Recipes.FindAsync(id);
            if (item == null) return false;

            _db.Recipes.Remove(item);
            await _db.SaveChangesAsync();

            return true;
        }
       
    }
}