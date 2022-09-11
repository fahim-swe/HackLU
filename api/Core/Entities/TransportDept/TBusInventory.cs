using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace api.Core.Entities.TransportDept
{
    public class TBusInventory
    {
        [MongoDB.Bson.Serialization.Attributes.BsonId, BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]     
        public string id {get; set;}
        public string license{get; set;} = null!;
        public string capacity {get; set;}
        
        public string driverName {get;set;} = null!;
        public string phone {get; set;} = null!;
        public bool isActive {get; set;} = false;

        public bool isAvailable {get; set;} = true;
    }
}