using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using backend.Application.Interfaces;
using backend.Domain.Models;
using Microsoft.IdentityModel.Tokens;

namespace backend.Application.Services
{
    public class TokenServices : ITokenServices
    {
        private readonly IConfiguration _config;

        public TokenServices(IConfiguration config)
        {
            _config = config;
        }

        public AuthResult GenerateToken(User user)
        {
            //represent user identity and permissions
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserId.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(ClaimTypes.Name, user.FullName ?? user.Email),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            //build your JWT
            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(30),
                signingCredentials: creds
            );

            //convert token to string
            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            return new AuthResult
            {
                Success = true,
                Token = tokenString,
                ExpiresAt = token.ValidTo,
                User = new LoginUser
                {
                    UserId = user.UserId,
                    FullName = user.FullName
                }
            };
        }
    }
}