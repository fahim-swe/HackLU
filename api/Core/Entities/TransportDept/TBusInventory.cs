namespace api.Core.Entities.TransportDept
{
    public class TBusInventory
    {
        public Guid codeName {get; set;} 
        public string license{get; set;} = null!;
        public int capacity {get; set;}
        
        public string driverName {get;set;} = null!;
        public string phone {get; set;} = null!;
        public bool isActive {get; set;}
    }
}