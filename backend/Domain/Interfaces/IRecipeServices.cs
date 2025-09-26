using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Application.DTOs;
using backend.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Domain.Interfaces
{
    public interface IRecipeServices
    {
        Task<IEnumerable<DisplayRecipeDto>> GetAllAsync();
        Task<DisplayRecipeDto?> GetRecipeAsync(int id);
        Task<Recipe> Create(RecipeDto data);
        Task<bool> Update(RecipeDto dto, int id);
        Task<bool> Delete(int id);
    }
}