using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Domain.Models
{
    public class Category
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; } = "";

        [JsonIgnore]
        public ICollection<Recipe>? Recipes { get; set; }
    }
}