namespace api.Core.Dtos
{
    public class TBusRouteDto
    {
        public string locationName {get; set;} = null!;
        public string latitude {get; set;} = null!;
        public string longitude {get; set;} = null!;
        public DateTime startTime {get; set;} 
    }
}