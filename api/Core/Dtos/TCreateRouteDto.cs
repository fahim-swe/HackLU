namespace api.Core.Dtos
{
    public class TCreateRouteDto
    {
        private static int RouteNumber = 0;
        
        public int routeNumber = RouteNumber++;
        
    }
}