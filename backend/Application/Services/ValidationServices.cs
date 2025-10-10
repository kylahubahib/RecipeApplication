using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using backend.Infrastructure.Context;

namespace backend.Application.Services
{

    //base class
    public abstract class ValidationServices<T> //generic type parameter
    {
        public abstract bool Validate(T input);
    }

    public class RegisterValidation : ValidationServices<RegisterDto>
    {
        private readonly AppDbContext _context;

        public RegisterValidation(AppDbContext context)
        {
            _context = context;
        }

        public override bool Validate(RegisterDto dto)
        {
            return !_context.Users.Any(u => u.Email == dto.Email);
        }
    }

    public class PasswordValidation : ValidationServices<string>
    {
        public override bool Validate(string password)
        {
            return !string.IsNullOrWhiteSpace(password) && password.Length >= 8;
        }
    }

    public class ImageFileValidation : ValidationServices<IFormFile>
    {
        public override bool Validate(IFormFile file)
        {
            return file.Length < 2_000_000; // max 2MB
        }
    }

    public class EmailFormatValidation : ValidationServices<string>
    {
        public override bool Validate(string email)
        {
            var pattern = @"^[^@\s]+@[^@\s]+\.[^@\s]+$";
            return Regex.IsMatch(email, pattern);
        }
    }

    
}
