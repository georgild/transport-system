using DataLayer.Session;
using DataLayer.Utilities;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.Repository {
    public class RoutesRepository {

        private static MongoSession _session;
        
        private static long DAY_MS = 24 * 60 * 60 * 1000;

        public Expression<Func<Route, bool>> ParseFilters (List<RequestFilter> filters) {

            if (filters.Count() <= 0) {
                throw new ArgumentNullException();
            }

            Expression<Func<Route, bool>> result = null;
            Expression<Func<Route, bool>> filter = null;

            foreach (RequestFilter requestFilter in filters) {

                switch (requestFilter.Property) {

                    case "InitialStop.City":
                        filter = (route => route.InitialStop.City.Contains(requestFilter.Value));
                        break;
                    case "InitialStop.DepartureDate":
                        filter = (route =>
                            route.InitialStop.DepartureDate > (long.Parse(requestFilter.Value) - DAY_MS) &&
                            route.InitialStop.DepartureDate < (long.Parse(requestFilter.Value) + DAY_MS));
                        break;
                    case "FinalStop.City":
                        filter = (route => route.FinalStop.City.Contains(requestFilter.Value));
                        break;
                    case "FinalStop.ArrivalDate":

                        filter = (route =>
                            route.FinalStop.ArrivalDate > (long.Parse(requestFilter.Value) - DAY_MS) &&
                            route.FinalStop.ArrivalDate < (long.Parse(requestFilter.Value) + DAY_MS));
                        break;
                    case "CompanyName":
                        filter = (route => route.CompanyName.Contains(requestFilter.Value));
                        break;
                    case "Type":
                        filter = (route => route.Type == (RouteType)Enum.Parse(typeof(RouteType), requestFilter.Value));
                        break;
                    case "TicketPrice":
                        //filter = (route => route.TicketPrice == requestFilter.Value);
                        break;
                }
                if (null == result) {
                    result = filter;
                }
                else {
                    result = ExpressionHelpers.CombineWithAnd(result, filter);
                }
            }
            //Expression.AndAlso
            return result;
        }

        public RoutesRepository() {
            _session = new MongoSession();
            _session.Connect();
        }

        public void Delete(string Id) {
            _session.Delete<Route>(r => r.Id == Id);
        }

        public List<Route> Find(List<RequestFilter> filters, int? start = null, int? limit = null) {

            Expression<Func<Route, bool>> filter = (r => true);

            if (filters.Count > 0) {
                filter = ParseFilters(filters);
            }

            return _session.Find(filter, start, limit);
        }

        public void InsertOne(Route route) {
            _session.InsertOne(route);
        }

        public void ReplaceOne(string Id, Route route) {
            _session.ReplaceOne(r => r.Id == Id, route);
        }
    }
}