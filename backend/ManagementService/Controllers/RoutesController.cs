using Authorization;
using DataLayer.Repository;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Newtonsoft.Json;
using RoutesService.UtilityServices;

namespace RoutesService.Controllers {

    [AuthFilter]
    [RoutePrefix("api/v1/routes")]
    public class RoutesController : ApiController {

        private static RoutesRepository _repository;

        public RoutesController() {
            _repository = new RoutesRepository();
        }

        [Route("")]
        [HttpGet]
        public List<Route> Get(
            [FromUri]string filters = null,
            [FromUri]string currency = "USD",
            [FromUri]int? start = null,
            [FromUri]int? limit = null) {

            List<Route> result = new List<Route>();

            try {
                List<RequestFilter> parsedFilters = new List<RequestFilter>();
                if (!string.IsNullOrWhiteSpace(filters)) {
                    parsedFilters = JsonConvert.DeserializeObject<List<RequestFilter>>(filters);
                }

                result = _repository.Find(parsedFilters, start, limit);

                if (currency != "USD") {
                    try {
                        ConvertCurrency(result, "USD", currency);
                    }
                    catch (Exception exc) {
                        Console.WriteLine(exc);
                    }
                }
            } catch (Exception exc) {
                Console.WriteLine(exc);
                throw new HttpResponseException(System.Net.HttpStatusCode.BadRequest);
            }

            return result;
        }

        [Route("")]
        [HttpPost]
        public IHttpActionResult Post([FromBody]Route route) {
            _repository.InsertOne(route);
            return Ok();
        }

        [Route("{Id}")]
        [HttpPut]
        public IHttpActionResult Put(string Id, [FromBody]Route route) {
            _repository.ReplaceOne(Id, route);
            return Ok();
        }

        [Route("{Id}")]
        [HttpDelete]
        public IHttpActionResult Delete(string Id) {
            _repository.Delete(Id);
            return Ok();
        }

        private void ConvertCurrency (List<Route> routes, string fromCurrency, string toCurrency) {

            var remoteAddress = new System.ServiceModel.EndpointAddress("http://localhost:64361/UtilityService.asmx");
            UtilityServiceSoapClient utilityService = 
                new UtilityServiceSoapClient(new System.ServiceModel.BasicHttpBinding(), remoteAddress);
            double newAmount;
            routes.ForEach(delegate (Route route) {
                newAmount = utilityService.ConvertCurrency(route.TicketPrice, fromCurrency, toCurrency);
                if (newAmount >= 0) {
                    route.TicketPrice = newAmount;
                } else {
                    Console.WriteLine("Invalid amount: " + newAmount);
                }
            });
        }
    }
}