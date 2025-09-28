using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Domain.Interfaces;
using backend.Domain.Models;
using backend.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;

namespace backend.Application.Services
{
    public class CategoryServices : ICategoryServices
    {
        private readonly AppDbContext _db;
        private readonly ILogger<CategoryServices> _logger;

        public CategoryServices(AppDbContext db, ILogger<CategoryServices> logger)
        {
            _db = db;
            _logger = logger;
        }

        public async Task<IEnumerable<Category>> GetAllAsync()
        {
            return await _db.Categories.ToListAsync();
        }
        
        public async Task<Category?> GetCategoryAsync(int id)
        {
            return await _db.Categories.FindAsync(id);
        }
        public async Task<Category> Create(Category data)
        {
            await _db.Categories.AddAsync(data);
            await _db.SaveChangesAsync();

            return data;
        }

        public async Task<bool> Update(Category dto, int id)
        {
            var exists = await _db.Categories.AnyAsync(t => t.CategoryId == id);
            if (!exists) return false;

            _db.Entry(dto).State = EntityState.Modified;
            await _db.SaveChangesAsync();

            return true;
        }
        
        public async Task<bool> Delete(int id)
        {
            var item = await _db.Categories.FindAsync(id);
            if (item == null) return false;

            _db.Categories.Remove(item);
            await _db.SaveChangesAsync();

            return true;
        }
    }
}