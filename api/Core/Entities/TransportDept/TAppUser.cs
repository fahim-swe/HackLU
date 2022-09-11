using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;


namespace api.Core.Entities.TransportDept
{
    public class TAppUser
    {

 [MongoDB.Bson.Serialization.Attributes.BsonId, BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]     
        public string id {get; set;}
        public string FullName {get; set;} = null!;


        public string UserName {get; set;} = null!;
        public string ContractNumber {get; set;} = null!;
        public Byte[] PasswordHash {get; set;} = null!;
        public Byte[] PasswordSalt {get; set;} = null!;
    }
}