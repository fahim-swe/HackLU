using api.Core.Entities.TransportDept;
using api.Core.Interfaces;
using api.Database;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace api.Infrastructure.Data.Database.TransportDept
{
    public class TAccountRepository : TIAccountRepository
    {

        private readonly IMongoCollection<TAppUser> _usesCollection;
        public TAccountRepository(IOptions<ApiDataBaseSetttings> userNameStoreDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                userNameStoreDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                userNameStoreDatabaseSettings.Value.DatabaseName);

            _usesCollection = mongoDatabase.GetCollection<TAppUser>(
                userNameStoreDatabaseSettings.Value.TAppUser);
        }
        public async Task AddUser(TAppUser user)
        {
            await _usesCollection.InsertOneAsync(user);
        }

        public async Task<bool> IsUsernameExits(string username)
        {
            return await _usesCollection.Find( _=> _.UserName == username).AnyAsync();
        }

        public async Task<TAppUser> GetByUsername(string username)
        {
            return await _usesCollection.Find( _=> _.UserName == username).FirstOrDefaultAsync();
        }
    }
}