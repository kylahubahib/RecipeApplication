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
            return !_context.Users.Any(u => u.Email == dto.Email);
        }
    }

    public class PasswordValidation : IValidationServices<string>
    {
        public bool Validate(string password)
        {
            return !string.IsNullOrWhiteSpace(password) && password.Length >= 8;
        }
    }

    public class ImageFileValidation : IValidationServices<IFormFile>
    {
        public bool Validate(IFormFile file)
        {
            return file.Length < 2_000_000; // max 2MB
        }
    }


    
}
