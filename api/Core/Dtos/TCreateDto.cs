using System.ComponentModel.DataAnnotations;

namespace api.Core.Dtos
{
    public class TCreateDto
    {
        
        [Required]
        public string FullName {get; set;} = null!;

        [Required]
        public string ContractNumber {get; set;} = null!;

        [Required]
        public string UserName {get; set;} = null!;

        [Required]
        public string Password {get; set;} = null!;
    }
}