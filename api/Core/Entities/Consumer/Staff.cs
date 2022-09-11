using api.Core.Dtos;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace api.Core.Entities.Consumer
{
    public class Staff : CAppUserDto
    {
      [MongoDB.Bson.Serialization.Attributes.BsonId, BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]     
        public string id {get; set;}
    }
}