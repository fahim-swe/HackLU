using api.Core.Entities.TransportDept;

namespace api.Core.Interfaces
{
    public interface TIAccountRepository
    {
        Task AddUser(TAppUser user);
        Task<bool> IsUsernameExits(string username);

        Task<TAppUser> GetByUsername(string username);
    }
}