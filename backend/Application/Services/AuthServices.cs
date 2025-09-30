using System;
using System.Threading.Tasks;
using backend.Domain.Interfaces;
using backend.Infrastructure.Context;
using backend.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace backend.Application.Services
{

public class AuthServices : IAuthServices
{
    private readonly AppDbContext _context;
    private readonly ITokenServices _tokenService;

    public AuthServices(AppDbContext context, ITokenServices tokenService)
    {
        _context = context;
        _tokenService = tokenService;
    }

    public async Task<AuthResult> RegisterAsync(RegisterDto dto)
    {
        if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
            throw new Exception("Email already exists.");

        var user = new User
        {
            FullName = dto.FullName,
            Email = dto.Email,
            Password = BCrypt.Net.BCrypt.HashPassword(dto.Password)
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return _tokenService.GenerateToken(user);
    }

    public async Task<AuthResult> LoginAsync(LoginDto dto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            throw new Exception("Invalid credentials.");

        return _tokenService.GenerateToken(user);
    }
}


}
