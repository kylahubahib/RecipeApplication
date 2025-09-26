using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Domain.Interfaces;

namespace backend.Application.Services
{
    public class ConvertImageServices : IConvertImageServices
    {
        public byte[]? ConvertToBytes(IFormFile? imageFile)
        {
            if (imageFile == null || imageFile.Length == 0)
                return null;

            using (var memoryStream = new MemoryStream())
            {
                imageFile.CopyTo(memoryStream);
                return memoryStream.ToArray();
            }
        }
    }
}