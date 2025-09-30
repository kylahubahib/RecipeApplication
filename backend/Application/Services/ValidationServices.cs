using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using backend.Domain.Interfaces;
using backend.Infrastructure.Context;

namespace backend.Application.Services
{
    
    public class RegisterValidation : IValidationServices<RegisterDto>
    {
        private readonly AppDbContext _context;

        public RegisterValidation(AppDbContext context)
        {
            _context = context;
        }

        public bool Validate(RegisterDto dto)
        {
            // Example: Email must be unique
            return !_context.Users.Any(u => u.Email == dto.Email);
        }
    }

    public class PasswordValidation : IValidationServices<string>
    {
        public bool Validate(string password)
        {
            // Example: Require at least 8 chars
            return !string.IsNullOrWhiteSpace(password) && password.Length >= 8;
        }
    }

    public class ImageFileValidation : IValidationServices<IFormFile>
    {
        public bool Validate(IFormFile file)
        {
            // Example: Check file type
            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png" };
            var extension = Path.GetExtension(file.FileName).ToLower();
            return allowedExtensions.Contains(extension) && file.Length < 2_000_000; // max 2MB
        }
    }


    
}
