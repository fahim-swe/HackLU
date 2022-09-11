namespace api.Core.Dtos
{
    public class TUserDto
    {
        public Guid Id {get; set;}
        public string FullName {get; set;} = null!;
        public string UserName {get; set;} = null!;
        public string ContractNumber {get; set;} = null!;

        public string Token {get; set;} = null!;
    }
}