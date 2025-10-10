using System.Threading.Tasks;
using backend.Application.Services;
using backend.Application.Interfaces;
using backend.Domain.Models; 
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthServices _authService;
        private readonly ValidationServices<RegisterDto> _registerValidator;
        private readonly ValidationServices<string> _passwordValidator;
        private readonly EmailFormatValidation _emailFormat;


        public AuthController(IAuthServices authService,
            ValidationServices<RegisterDto> registerValidator,
            ValidationServices<string> passwordValidator,
            EmailFormatValidation emailFormat
        )
        {
            _authService = authService;
            _registerValidator = registerValidator;
            _passwordValidator = passwordValidator;
            _emailFormat = emailFormat;
        }

        // POST: api/auth/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            
            if (!_registerValidator.Validate(dto))
                return BadRequest(new { message = "Email already exists" });

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var result = await _authService.RegisterAsync(dto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // POST: api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var result = await _authService.LoginAsync(dto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Unauthorized(new { message = "Invalid email or password." });
            }
        }
    }
}
