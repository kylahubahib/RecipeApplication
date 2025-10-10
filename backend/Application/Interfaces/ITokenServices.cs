using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Domain.Models;

namespace backend.Application.Interfaces
{
    public interface ITokenServices
    {
        AuthResult GenerateToken(User user);
    
    }
}