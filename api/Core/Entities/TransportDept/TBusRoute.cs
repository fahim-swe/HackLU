namespace api.Core.Entities.TransportDept
{
    public class TBusRoute
    {
        private static int _RouteNumber = 0;
        public string RouteNumber {get; set;} =  _RouteNumber++.ToString();
        public string locationName {get; set;} = null!;
        public string latitude {get; set;} = null!;
        public string longitude {get; set;} = null!;

        public DateTime Time {get; set;} = DateTime.Now;

    }
}