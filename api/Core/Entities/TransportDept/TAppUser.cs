namespace api.Core.Entities.TransportDept
{
    public class TAppUser
    {
        public Guid Id {get; set;}
        public string FullName {get; set;} = null!;


        public string UserName {get; set;} = null!;
        public string ContractNumber {get; set;} = null!;
        public Byte[] PasswordHash {get; set;} = null!;
        public Byte[] PasswordSalt {get; set;} = null!;
    }
}