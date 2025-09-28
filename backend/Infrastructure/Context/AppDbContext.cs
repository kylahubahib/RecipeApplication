using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Infrastructure.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        //Mapping models to the database table
        public DbSet<Recipe> Recipes => Set<Recipe>();
        public DbSet<Category> Categories => Set<Category>();
    }
}