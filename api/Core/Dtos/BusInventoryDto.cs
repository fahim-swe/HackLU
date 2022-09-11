using System.ComponentModel.DataAnnotations;

namespace api.Core.Entities.TransportDept
{
    public class BusInventoryDto
    {
        [Required]
        public string license{get; set;} = null!;

         [Required]
        public string capacity {get; set;}

         [Required]
        
        public string driverName {get;set;} = null!;

         [Required]
        public string phone {get; set;} = null!;

        public bool isActive{get; set;}
        public bool isAvailable {get; set;}
    }
}