using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace api.Core.Entities.TransportDept
{
    public class TEmplySit
    {
        [MongoDB.Bson.Serialization.Attributes.BsonId, BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]     
        public string id {get; set;}
        public string routeNumber {get; set;}
        public string emptySeats {get; set;}
        public string time {get; set;}
        public string busId {get; set;}
        public string license {get; set;}
        public string stoppagePoint {get; set;}
    }
}