using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Application.DTOs
{
    public class RecipeDto
    {
        public int RecipeId { get; set; }
        public int? CategoryId { get; set; }
        public string Title { get; set; } = "";
        public string? Description { get; set; }
        public string Instruction { get; set; } = "";
        public byte[]? Image { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public int UserId { get; set; }

    }

    public class DisplayRecipeDto
    {
        public int RecipeId { get; set; }
        public int? CategoryId { get; set; }
        public string Title { get; set; } = "";
        public string? Description { get; set; }
        public string Instruction { get; set; } = "";
        public string? Image { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public string? CategoryName { get; set; }
        public int UserId { get; set; }

    }

    public class CreateRecipeDto
    {
        public int RecipeId { get; set; }
        public int? CategoryId { get; set; }
        public string Title { get; set; } = "";
        public string? Description { get; set; }
        public string Instruction { get; set; } = "";
        public IFormFile? Image { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public string? CategoryName { get; set; } = "";
        public int UserId { get; set; }

    }
    public class UpdateRecipeDto
    {
        public int RecipeId { get; set; }
        public int? CategoryId { get; set; }
        public string Title { get; set; } = "";
        public string? Description { get; set; }
        public string Instruction { get; set; } = "";
        public IFormFile? Image { get; set; }
        public DateTime CreatedAt { get; set; }
        public int UserId { get; set; }

    }
}