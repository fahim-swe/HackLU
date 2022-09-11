using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace api.Core.Entities.TransportDept
{
    public class TAddBustoRoute
    {
         [MongoDB.Bson.Serialization.Attributes.BsonId, BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]     
        public string id {get; set;}
        public string BusId {get; set;}
        public string RouteNumber {get; set;}
    }
}