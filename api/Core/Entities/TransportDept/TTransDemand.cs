using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;


namespace api.Core.Entities.TransportDept
{
    public class TTransDemand
    {
         [MongoDB.Bson.Serialization.Attributes.BsonId, BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]     
        public string id {get; set;}
        public string routeNumber {get; set;}
        public string Time {get; set;} 
        public string teachers {get; set;}
        public string students {get; set;}
        public string staff {get; set;}
        public string sthers {get; set;}
    }
}