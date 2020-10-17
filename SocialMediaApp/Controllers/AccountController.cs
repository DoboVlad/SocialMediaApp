using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SocialMediaApp.Data;
using SocialMediaApp.DTO;
using SocialMediaApp.Model;
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
        public AccountController(SocialMediaDataContext db)
        {
            this.db = db;
        }

        [HttpPost]
        [Route("register")]
        public async Task<ActionResult<User>> registerUser(RegisterDto registerDto)
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

            return user;
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<User>> LoginUser(LoginDto loginDto)
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
            return user;
        }
    }
}
