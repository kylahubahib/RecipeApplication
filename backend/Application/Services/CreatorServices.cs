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
    public class CreatorServices
    {
        private readonly AppDbContext _db;
        private readonly ILogger<CreatorServices> _logger;

        public CreatorServices(AppDbContext db, ILogger<CreatorServices> logger)
        {
            _db = db;
            _logger = logger;
        }

        public async Task<IEnumerable<Creator>> GetAllAsync()
        {
            return await _db.Creators.ToListAsync();
        }
        
        public async Task<Creator?> GetRecipeAsync(int id)
        {
            return await _db.Creators.FindAsync(id);
        }
        public async Task<Creator> Create(Creator data)
        {
            await _db.Creators.AddAsync(data);
            await _db.SaveChangesAsync();

            return data;
        }

        public async Task<bool> Update(Creator dto, int id)
        {
            var exists = await _db.Creators.AnyAsync(t => t.CreatorId == id);
            if (!exists) return false;

            _db.Entry(dto).State = EntityState.Modified;
            await _db.SaveChangesAsync();

            return true;
        }
        
        public async Task<bool> Delete(int id)
        {
            var item = await _db.Creators.FindAsync(id);
            if (item == null) return false;

            _db.Creators.Remove(item);
            await _db.SaveChangesAsync();

            return true;
        }
    }
}