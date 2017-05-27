using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models {

    public class BusStop {

        public Int64 ArrivalDate { get; set; }

        public Int64 DepartureDate { get; set; }

        public string City { get; set; }
    }

    public enum RouteType {
        Arrivals = 0,
        Departures = 1
    }

    public class Route {

        [BsonIgnoreIfNull]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string CompanyName { get; set; } // TODO or Id

        public BusStop InitialStop { get; set; }

        public List<BusStop> IntermediateStops { get; set; }

        public BusStop FinalStop { get; set; }

        public double TicketPrice { get; set; }

        public RouteType Type { get; set; }
    }
}
