﻿using DataLayer.Session;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.Repository {
    public class BusRoutesRepository {

        private static MongoSession _session;

        public Expression<Func<BusRoute, bool>> ParseFilters (List<RequestFilter> filters) {

            if (filters.Count() <= 0) {
                throw new ArgumentNullException();
            }

            Expression<Func<BusRoute, bool>> result = null;
            Expression<Func<BusRoute, bool>> filter = null;

            foreach (RequestFilter requestFilter in filters) {

                switch (requestFilter.Property) {

                    case "InitialStop.City":
                        filter = (route => route.InitialStop.City.Contains(requestFilter.Value));
                        break;
                    case "InitialStop.ArrivalDate":
                        filter = (route => route.InitialStop.DepartureDate.ToString() == requestFilter.Value);
                        //filter = (route => route.Type == requestFilter.Value);
                        break;
                    case "FinalStop.City":
                        filter = (route => route.FinalStop.City.Contains(requestFilter.Value));
                        break;
                    case "FinalStop.ArrivalDate":
                        filter = (route => route.FinalStop.ArrivalDate.ToString() == requestFilter.Value);
                        //filter = (route => route.Type == requestFilter.Value);
                        break;
                    case "CompanyName":
                        filter = (route => route.CompanyName.Contains(requestFilter.Value));
                        break;
                    case "Type":
                        //filter = (route => route.Type == requestFilter.Value);
                        break;
                    case "TicketPrice":
                        //filter = (route => route.Type == requestFilter.Value);
                        break;
                }
                if (null == result) {
                    result = filter;
                }
                else {
                    var body = Expression.AndAlso(result.Body, filter.Body);
                    result = Expression.Lambda<Func<BusRoute, bool>>(body, result.Parameters[0]);
                }
            }
            //Expression.AndAlso
            return result;
        }

        public BusRoutesRepository() {
            _session = new MongoSession();
            _session.Connect();
        }

        public void Delete(string Id) {
            _session.Delete<BusRoute>(r => r.Id == Id);
        }

        public List<BusRoute> Find(List<RequestFilter> filters) {
            return _session.Find(ParseFilters(filters));
        }

        public void InsertOne(BusRoute route) {
            _session.InsertOne(route);
        }

        public void ReplaceOne(string Id, BusRoute route) {
            _session.ReplaceOne(r => r.Id == Id, route);
        }
    }
}