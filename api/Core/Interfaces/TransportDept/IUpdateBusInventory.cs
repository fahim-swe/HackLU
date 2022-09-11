using api.Core.Dtos;
using api.Core.Entities.TransportDept;

namespace api.Core.Interfaces.TransportDept
{
    public interface IUpdateBusInventory
    {
         Task AddBusInvertory(TBusInventory busInvertory);
         Task<IEnumerable<TBusInventory>> GetAvailableBus();

         Task AddBusRoute(TBusRoute busRoute);
         Task<IEnumerable<TBusRoute>> GetBusRoutes();

         Task AddTransPortDemands(TTransDemand transDemand);

         Task<PassengerDto> GetPassengerOfaRoot(string routeName, string time);
    }
}