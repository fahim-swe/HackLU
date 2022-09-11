using MongoDB.Bson.Serialization.Attributes;

namespace api.Core.Entities.TransportDept
{
    public class TBusRoute
    {
         [MongoDB.Bson.Serialization.Attributes.BsonId, BsonElement("_id"), BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]     
        public string id {get; set;}
        private static int _RouteNumber = 0;
        public string RouteNumber {get; set;} =  _RouteNumber++.ToString();
        public string locationName {get; set;} = null!;
        public string latitude {get; set;} = null!;
        public string longitude {get; set;} = null!;

        public string stoppagePoint{get; set;} = null!;
        public string Time {get; set;} = null!;
    }
}