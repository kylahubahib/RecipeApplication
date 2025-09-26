using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Domain.Models
{
    public class Creator
    {
        public int CreatorId { get; set; }
        public string Name { get; set; } = "";
        public ICollection<Recipe>? Recipes { get; set; }
    }
}