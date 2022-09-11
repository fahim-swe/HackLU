namespace api.Core.Dtos
{
    public class TCreateRouteDto
    {
        public string locationName {get; set;} = null!;
        public string latitude {get; set;} = null!;
        public string longitude {get; set;} = null!;
    }
}