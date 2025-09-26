using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
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
                .Include(r => r.Creator)
                .Select(r => new DisplayRecipeDto
                {
                    RecipeId = r.RecipeId,
                    CreatorId = r.CreatorId,
                    Title = r.Title,
                    Description = r.Description,
                    Instruction = r.Instruction,
                    Image = r.Image,
                    CreatedAt = r.CreatedAt,
                    FullName = r.Creator != null ? r.Creator.Name : "Anonymous"
                })
            .ToListAsync();
        }

        public async Task<DisplayRecipeDto?> GetRecipeAsync(int id)
        {
            return await _db.Recipes
                .Include(r => r.Creator)
                .Where(r => r.RecipeId == id)
                .Select(r => new DisplayRecipeDto
                {
                    RecipeId = r.RecipeId,
                    CreatorId = r.CreatorId,
                    Title = r.Title,
                    Description = r.Description,
                    Instruction = r.Instruction,
                    Image = r.Image,
                    CreatedAt = r.CreatedAt,
                    FullName = r.Creator != null ? r.Creator.Name : "Anonymous"
                })
            .FirstOrDefaultAsync();
        }
        public async Task<Recipe> Create(RecipeDto data)
        {
            

            var newRecipe = new Recipe
            {
                RecipeId = data.RecipeId,
                CreatorId = data.CreatorId,
                Title = data.Title,
                Description = data.Description,
                Instruction = data.Instruction,
                Image = data.Image,
                CreatedAt = data.CreatedAt,
            };
            
            await _db.Recipes.AddAsync(newRecipe);
            await _db.SaveChangesAsync();

            return newRecipe;
        }

        public async Task<bool> Update(RecipeDto dto, int id)
        {

            var exists = await _db.Recipes.AnyAsync(t => t.RecipeId == id);
            if (!exists) return false;

            _db.Entry(dto).State = EntityState.Modified;
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