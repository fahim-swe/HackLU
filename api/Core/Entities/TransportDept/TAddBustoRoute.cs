using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace api.Core.Entities.TransportDept
{
    public class TAddBustoRoute
    {
        public string BusId {get; set;}
        public string RouteNumber {get; set;}
        public string Time {get; set;}
    }
}