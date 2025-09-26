using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Application.DTOs
{
    public class RecipeDto
    {
        public int RecipeId { get; set; }
        public int? CreatorId { get; set; }
        public string Title { get; set; } = "";
        public string? Description { get; set; }
        public string Instruction { get; set; } = "";
        public byte[]? Image { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;

    }

    public class DisplayRecipeDto
    {
        public int RecipeId { get; set; }
        public int? CreatorId { get; set; }
        public string Title { get; set; } = "";
        public string? Description { get; set; }
        public string Instruction { get; set; } = "";
        public byte[]? Image { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public string? FullName { get; set; }

    }
}