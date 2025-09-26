using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Domain.Models 
{
    public class Recipe
    {
        public int RecipeId { get; set; }
        public int? CreatorId { get; set; }
        public string Title { get; set; } = "";
        public string? Description { get; set; }
        public string Instruction { get; set; } = "";
        public byte[]? Image { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        
        [ForeignKey("CreatorId")]
        public virtual Creator? Creator { get; set; }

    }
}