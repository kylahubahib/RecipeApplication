using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Domain.Interfaces
{
    
    // "T" let your validation interface work with different input types without duplicating code
    public interface IValidationServices<T> //generic type parameter
    {
        bool Validate(T input);
    }
}