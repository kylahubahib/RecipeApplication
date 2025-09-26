using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using backend.Domain.Interfaces;
using backend.Infrastructure.Context;

namespace backend.Application.Services
{
    
    public class InputValidation : IValidationServices
    {
        public bool Validate()
        {
            return true;
        }
    }

    public class ImageFileValidation : IValidationServices
    {
        public bool Validate()
        {
            return true;
        }
    }

    
}
