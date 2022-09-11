using api.Core.Dtos;
using api.Core.Entities.TransportDept;
using api.Core.Interfaces.TransportDept;
using api.Database;
using AutoMapper;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace api.Infrastructure.Data.Database.TransportDept
{
    public class UpdateBusInvertory : IUpdateBusInventory
    {

        private readonly IMongoCollection<TBusInventory> _busInventoryCollection;
        private readonly IMongoCollection<TBusRoute> _busRoute;
        private readonly IMongoCollection<TTransDemand> _transDemands;
        private readonly IMongoCollection<TAddBustoRoute> _tAddBustoRoute;
        private readonly IMapper _mapper;
        public UpdateBusInvertory(IOptions<ApiDataBaseSetttings> userNameStoreDatabaseSettings, IMapper mapper)
        {

            _mapper = mapper;
            var mongoClient = new MongoClient(
                userNameStoreDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                userNameStoreDatabaseSettings.Value.DatabaseName);

            _busInventoryCollection = mongoDatabase.GetCollection<TBusInventory>(
                userNameStoreDatabaseSettings.Value.TBusInventory);

            _busRoute  = mongoDatabase.GetCollection<TBusRoute>(
                userNameStoreDatabaseSettings.Value.TBusRoute
            );

            _transDemands = mongoDatabase.GetCollection<TTransDemand>
            (
                userNameStoreDatabaseSettings.Value.TTransDemand
            );

            _tAddBustoRoute = mongoDatabase.GetCollection<TAddBustoRoute>
            (
                userNameStoreDatabaseSettings.Value.TAddBustoRoute
            );
        }
        public async Task AddBusInvertory(TBusInventory busInvertory)
        {
            await _busInventoryCollection.InsertOneAsync(busInvertory);
        }

        public async Task<IEnumerable<TBusInventory>> GetAvailableBus()
        {
            var buss=  await _busInventoryCollection.Find( x => x.isActive == true).ToListAsync();
            return buss;
        }

        public async Task AddBusRoute(TBusRoute busRoute)
        {
            await _busRoute.InsertOneAsync(busRoute);   
        }

        public async Task<IEnumerable<TBusRoute>> GetBusRoutes()
        {
            return await _busRoute.Find( x => true).ToListAsync();
        }

        public async Task AddTransPortDemands(TTransDemand transDemand)
        {
            await _transDemands.InsertOneAsync(transDemand);
        }


        public async Task<PassengerDto> GetPassengerOfaRoot(string routeName, string time)
        {
            var tTransDemand = await _transDemands.Find(x => x.routeNumber == routeName && x.Time == time).FirstOrDefaultAsync();
            var busRoute =await _busRoute.Find(x => x.RouteNumber == routeName).FirstOrDefaultAsync();

            var passengers = _mapper.Map<PassengerDto>(tTransDemand);
            passengers.stoppagePoint = busRoute.stoppagePoint;

            return passengers;
        }


        public async Task AddBustoRoute(TAddBustoRoute addBustoRoute){
            await _tAddBustoRoute.InsertOneAsync(addBustoRoute);
        }
    }
}