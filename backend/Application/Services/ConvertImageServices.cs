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
            //Check if file exist
            if (imageFile == null || imageFile.Length == 0)
                return null;

            //Create a memory stream to store the file in memory.
            using (var memoryStream = new MemoryStream())
            {
                //Copy the uploaded file into the memory stream.
                imageFile.CopyTo(memoryStream);

                //Convert the stream to a byte[] and return it.
                return memoryStream.ToArray();
            }
        }

        public string? ConvertToString(byte[]? imageFile)
        {
            return imageFile != null ? $"data:image/png;base64,{Convert.ToBase64String(imageFile)}" : null;
        }
    }
}