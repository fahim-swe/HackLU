namespace api.Database
{
    public class ApiDataBaseSetttings
    {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string TAppUser { get; set; } = null!;

        public string TBusInventory {get; set;} = null!;

        public string TBusRoute {get; set; } = null!;

        public string TTransDemand {get; set;} = null!;
    }
}