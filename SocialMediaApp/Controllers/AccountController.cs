using Microsoft.AspNetCore.Mvc;
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
    }
}
