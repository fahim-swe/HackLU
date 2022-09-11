using api.Core.Entities.TransportDept;

namespace api.Core.Interfaces.TransportDept
{
    public interface IUpdateBusInventory
    {
         Task AddBusInvertory(TBusInventory busInvertory);
         Task<IEnumerable<TBusInventory>> GetAvailableBus();
    }
}