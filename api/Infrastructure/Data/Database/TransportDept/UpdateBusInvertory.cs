using api.Core.Entities.TransportDept;
using api.Core.Interfaces.TransportDept;
using api.Database;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace api.Infrastructure.Data.Database.TransportDept
{
    public class UpdateBusInvertory : IUpdateBusInventory
    {

        private readonly IMongoCollection<TBusInventory> _busInventoryCollection;
        private readonly IMongoCollection<TBusRoute> _busRoute;
        public UpdateBusInvertory(IOptions<ApiDataBaseSetttings> userNameStoreDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                userNameStoreDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                userNameStoreDatabaseSettings.Value.DatabaseName);

            _busInventoryCollection = mongoDatabase.GetCollection<TBusInventory>(
                userNameStoreDatabaseSettings.Value.TBusInventory);

            _busRoute  = mongoDatabase.GetCollection<TBusRoute>(
                userNameStoreDatabaseSettings.Value.TBusRoute
            );
        }
        public async Task AddBusInvertory(TBusInventory busInvertory)
        {
            await _busInventoryCollection.InsertOneAsync(busInvertory);
        }

        public async Task<IEnumerable<TBusInventory>> GetAvailableBus()
        {
            return await _busInventoryCollection.Find( x => x.isActive == true).ToListAsync();
        }

        public async Task AddBusRoute(TBusRoute busRoute)
        {
            await _busRoute.InsertOneAsync(busRoute);   
        }

        public async Task<IEnumerable<TBusRoute>> GetBusRoutes()
        {
             return await _busRoute.Find( x => true).ToListAsync();
        }
    }
}