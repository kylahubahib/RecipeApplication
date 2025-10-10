using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Application.DTOs;
using backend.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Application.Interfaces
{
    public interface ICategoryServices
    {
        Task<IEnumerable<Category>> GetAllAsync();
        Task<Category?> GetCategoryAsync(int id);
        Task<Category> Create(Category data);
        Task<bool> Update(Category dto, int id);
        Task<bool> Delete(int id);
    }
}