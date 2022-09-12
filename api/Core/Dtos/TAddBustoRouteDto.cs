namespace api.Core.Dtos
{
    public class TAddBustoRouteDto
    {
        public string BusId {get; set;}
        public string RouteNumber {get; set;}
        public string Time {get; set;}

        public string license {get; set;}
        public string capacity {get; set;}
        public string stoppagePoint {get; set;}
    }
}