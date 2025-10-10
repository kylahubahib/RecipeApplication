using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Application.Interfaces
{
    public interface IConvertImageServices
    {
        byte[]? ConvertToBytes(IFormFile? imageFile);
        string? ConvertToString(byte[]? imageFile);
    }
}