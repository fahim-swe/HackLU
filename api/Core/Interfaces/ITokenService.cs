using System.Security.Claims;
using api.Core.Dtos;
using api.Core.Entities.TransportDept;

namespace api.Core.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(TAppUser user);
    }
}