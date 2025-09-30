using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Domain.Models;

namespace backend.Domain.Interfaces
{
    public interface ITokenServices
    {
        AuthResult GenerateToken(User user);

        
    }
}