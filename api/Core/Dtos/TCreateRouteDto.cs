namespace api.Core.Dtos
{
    public class TCreateRouteDto
    {
        public string locationName {get; set;} = null!;
        public string stoppagePoint{get; set;} = null!;
        public string latitude {get; set;} = null!;
        public string longitude {get; set;} = null!;
        public string Time {get; set;} = null!;
        
    }
}