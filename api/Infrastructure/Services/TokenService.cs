using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using api.Core.Dtos;
using api.Core.Entities.TransportDept;
using api.Core.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace api.Infrastructure.Services
{
    public class TokenService : ITokenService
    {
        private readonly SymmetricSecurityKey _key;
        public TokenService(IConfiguration _config)
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["TokenKey"]));
        }
        public string CreateToken(TAppUser user)
        {
            
           var claims = new List<Claim> 
           {
             new Claim(JwtRegisteredClaimNames.NameId, user.Id.ToString()),
             new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName),
             new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
           };

           var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

           var tokenDescriptor = new SecurityTokenDescriptor{
               Subject = new ClaimsIdentity(claims),
               Expires = DateTime.Now.AddDays(7),
               SigningCredentials = creds
           };

           var tokenHandler = new JwtSecurityTokenHandler();
           var token = tokenHandler.CreateToken(tokenDescriptor);

           return  tokenHandler.WriteToken(token); 
        }       
    }
}