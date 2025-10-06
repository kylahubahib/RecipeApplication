using System.Threading.Tasks;
using backend.Application.Services;
using backend.Domain.Interfaces;
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


        public AuthController(IAuthServices authService,
            ValidationServices<RegisterDto> registerValidator,
            ValidationServices<string> passwordValidator
        )
        {
            _authService = authService;
            _registerValidator = registerValidator;
            _passwordValidator = passwordValidator;
        }

        // POST: api/auth/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!_registerValidator.Validate(dto))
                return BadRequest(new { message = "Email already exists" });

            if (!_passwordValidator.Validate(dto.Password))
                return BadRequest("Password must atleast have 8 characters");

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
                return Unauthorized(new { message = ex.Message });
            }
        }
    }
}
