using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SocialMediaApp.Data;
using SocialMediaApp.DTO;
using SocialMediaApp.Model;
using SocialMediaApp.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace SocialMediaApp.Controllers
{
    [ApiController]
    public class AccountController: ControllerBase
    {
        private readonly SocialMediaDataContext db;
        private readonly TokenService tokenService;
        public AccountController(SocialMediaDataContext db, TokenService tokenService)
        {
            this.db = db;
            this.tokenService = tokenService;
        }

        [HttpPost]
        [Route("register")] //https://localhost:5001/register
        public async Task<ActionResult<UserSuccesDto>> registerUser(RegisterDto registerDto)
        {
            using var hpass = new HMACSHA512();

            var user = new User
            {
                email = registerDto.Email,
                firstName = registerDto.firstName,
                lastName = registerDto.lastName,
                PasswordHash = hpass.ComputeHash(Encoding.UTF8.GetBytes(registerDto.password)),
                PasswordSalt = hpass.Key
            };
            
            db.User.Add(user);
            await db.SaveChangesAsync();

            return new UserSuccesDto
            {
                firstName = user.firstName,
                lastName = user.lastName,
                email = user.lastName,
                Token = tokenService.CreateToken(user)
            };
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<UserSuccesDto>> LoginUser(LoginDto loginDto)
        {
            var user = await db.User.SingleOrDefaultAsync(user => user.email == loginDto.email);

            
            if (user == null)
            {
                return Unauthorized("Invalid Credentials");
            }

            using var hpass = new HMACSHA512(user.PasswordSalt);

            var computedPassword = hpass.ComputeHash(Encoding.UTF8.GetBytes(loginDto.password));
           
            for (int i=0; i< computedPassword.Length; i++)
            {
                if (computedPassword[i] != user.PasswordHash[i])
                {
                    return Unauthorized("Invalid Credentials");
                }
            }

            return new UserSuccesDto
            {
                firstName = user.firstName,
                lastName = user.lastName,
                email = user.lastName,
                Token = tokenService.CreateToken(user)
            };
        }
    }
}
