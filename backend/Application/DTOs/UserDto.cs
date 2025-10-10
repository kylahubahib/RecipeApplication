using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Application.DTOs
{
    public class UserDto
    {
        public int UserId { get; set; }
        public string FullName { get; set; } = "";
        public string Email { get; set; } = "";
        public string Password { get; set; } = "";
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }

    public class ProfileDto
    {
        public int UserId { get; set; }
        public string FullName { get; set; } = "";
        public string Email { get; set; } = "";
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }

    
    public class UpdatePasswordDto
    {
        public int UserId { get; set; }
        public string OldPassword { get; set; } = "";

        [RegularExpression(
            @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$",
            ErrorMessage = "Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, and one number."
        )]
        public string NewPassword { get; set; } = "";
    }


}