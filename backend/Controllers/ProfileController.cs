using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Application.DTOs;
using backend.Application.Interfaces;
using backend.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ProfileController : ControllerBase
    {
        private readonly IProfileServices _profileService;

        public ProfileController(IProfileServices profileService)
        {
            _profileService = profileService;
        }


        [HttpGet("{id:int}")]
        public async Task<ActionResult<IEnumerable<ProfileDto>>> GetById(int id)
        {
            var user = await _profileService.GetProfileAsync(id);
            return (user == null) ? NotFound() : Ok(user);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateAsync(int id, ProfileDto dto)
        {
            var updated = await _profileService.UpdateProfileAsync(id, dto);
            return updated ? NoContent() : NotFound();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var deleted = await _profileService.DeleteProfileAsync(id);
            return deleted ? NoContent() : NotFound();
        }

        [HttpPut("Password/{id:int}")]
        public async Task<ActionResult> UpdatePasswordAsync(int id, [FromBody] UpdatePasswordDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
                
            var passUpdate = await _profileService.UpdatePasswordAsync(id, dto);
            return passUpdate.Success ? NoContent() : BadRequest(passUpdate.Message);
        }
    }
}