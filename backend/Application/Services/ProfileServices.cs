using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Application.DTOs;
using backend.Application.Interfaces;
using backend.Domain.Models;
using backend.Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration.UserSecrets;

namespace backend.Application.Services
{
    public class ProfileServices : IProfileServices
    {
        private readonly AppDbContext _db;

        public ProfileServices(AppDbContext db)
        {
            _db = db;
        }

        public async Task<ProfileDto?> GetProfileAsync(int id)
        {
            return await _db.Users
               .Where(u => id == u.UserId)
               .Select(u => new ProfileDto
               {
                   UserId = u.UserId,
                   FullName = u.FullName,
                   Email = u.Email,
                   CreatedAt = u.CreatedAt,
               })
               .FirstOrDefaultAsync();
        }

        public async Task<bool> UpdateProfileAsync(int id, ProfileDto dto)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.UserId == id);
            if (user == null) return false;

            user.FullName = dto.FullName;
            user.Email = dto.Email;

            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteProfileAsync(int id)
        {
            var user = await _db.Users.FindAsync(id);
            if (user == null) return false;

            _db.Users.Remove(user);
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<ResponseDto> UpdatePasswordAsync(int id, UpdatePasswordDto dto)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => id == u.UserId);
            if (user == null) return new ResponseDto { Success = false, Message = "User does not exist!" };

            if (!BCrypt.Net.BCrypt.Verify(dto.OldPassword, user.Password))
                return new ResponseDto { Success = false, Message = "The old password you entered is incorrect." };
                
            if (BCrypt.Net.BCrypt.Verify(dto.NewPassword, user.Password))
                return new ResponseDto { Success = false, Message = "You can't use your current password as a new password."};

            user.Password = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
            
            await _db.SaveChangesAsync();
            return new ResponseDto {Success = true, Message = "Successfully changed password."};
        }

    }
}