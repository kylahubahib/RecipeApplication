using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Application.DTOs;
using backend.Domain.Models;

namespace backend.Application.Interfaces
{
    public interface IProfileServices
    {
        Task<ProfileDto?> GetProfileAsync(int id);
        Task<bool> UpdateProfileAsync(int id, ProfileDto dto);
        Task<bool> DeleteProfileAsync(int id);
        Task<ResponseDto> UpdatePasswordAsync(int id, UpdatePasswordDto dto);
    }
}