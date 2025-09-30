using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Application.DTOs;
using backend.Domain.Interfaces;

namespace backend.Application.Services
{
    public class UserServices : IUserServices
    {
        public Task<UserDto?> GetUserAsync(int id)
        {
            return null;
        }
    }
}