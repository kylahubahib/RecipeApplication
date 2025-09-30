using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Application.DTOs;

namespace backend.Domain.Interfaces
{
    public interface IUserServices
    {

        
        Task<UserDto?> GetUserAsync(int id);

        // Task<IEnumerable<UserDto>> GetAllAsync();
        // Task<UserDto> Create(UserDto data);
        // Task<bool> Update(UserDto dto, int id);
        // Task<bool> Delete(int id);
    }
}