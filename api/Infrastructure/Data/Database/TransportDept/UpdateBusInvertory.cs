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

        private readonly IMongoCollection<TEmplySit> _emptySits;
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

            _emptySits = mongoDatabase.GetCollection<TEmplySit>
            (
                userNameStoreDatabaseSettings.Value.TEmplySit
            );
        }
        public async Task AddBusInvertory(TBusInventory busInvertory)
        {
            await _busInventoryCollection.InsertOneAsync(busInvertory);
        }

        public async Task<IEnumerable<TBusInventory>> GetAvailableBus()
        {
            var buss=  await _busInventoryCollection.Find( x => x.isActive == true && x.isAvailable == true)
                .ToListAsync();
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


        public async Task<PassengerDto> GetPassengerOfaRoot(PassengerDemandDto passengerDemandDto)
        {
            
            var tTransDemand = await _transDemands.Find(x => x.routeNumber == passengerDemandDto.routeName && x.Time == passengerDemandDto.time).FirstOrDefaultAsync();
            var busRoute =await _busRoute.Find(x => x.RouteNumber == passengerDemandDto.routeName).FirstOrDefaultAsync();

            var passengers = _mapper.Map<PassengerDto>(tTransDemand);
            passengers.stoppagePoint = busRoute.stoppagePoint;

            return passengers;
        }


        public async Task AddBustoRoute(TAddBustoRoute addBustoRoute){

            var _busInvertory = await _busInventoryCollection.Find(x => x.id == addBustoRoute.BusId).FirstOrDefaultAsync();
            _busInvertory.isAvailable = false;
            await _busInventoryCollection.ReplaceOneAsync(x => x.id == addBustoRoute.BusId, _busInvertory);

            await _tAddBustoRoute.InsertOneAsync(addBustoRoute);
        }

        public async Task<IEnumerable<TTransDemand>> GetTTransDemand()
        {

            return await _transDemands.Find(_=>true).ToListAsync();
        }

        public  async Task<IEnumerable<TAddBustoRoute>> GetTAddBusToRoute()
        {
            return await _tAddBustoRoute.Find( _=> true).ToListAsync();
        }


        public async Task AddEmptySite(TEmplySit emplySit)
         {
            await _emptySits.InsertOneAsync(emplySit);
         }

          public  async Task<IEnumerable<TEmplySit>> GetEmplySits()
        {
            return await _emptySits.Find( _=> true).ToListAsync();
        }

        public async Task<IEnumerable<TEmplySit>> GetEmptySites()
        {
            return await _emptySits.Find(x => true).ToListAsync();
        }
    }
}