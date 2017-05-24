using Authorization;
using DataLayer.Repository;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Newtonsoft.Json;
using ManagementService.UtilityServices;

namespace ManagementService.Controllers {

    [AuthFilter]
    [RoutePrefix("api/v1/routes")]
    public class BusRoutesController : ApiController {

        private static BusRoutesRepository _repository;

        public BusRoutesController() {
            _repository = new BusRoutesRepository();
        }

        [Route("")]
        [HttpGet]
        public List<BusRoute> Get(
            [FromUri]string filters = null,
            [FromUri]string currency = "USD") {

            List<BusRoute> result = new List<BusRoute>();

            try {
                List<RequestFilter> parsedFilters = new List<RequestFilter>();
                if (!string.IsNullOrWhiteSpace(filters)) {
                    parsedFilters = JsonConvert.DeserializeObject<List<RequestFilter>>(filters);
                }

                result = _repository.Find(parsedFilters);

                if (currency != "USD") {
                    try {
                        UtilityServiceSoapClient utilityService = new UtilityServiceSoapClient();
                        result.ForEach(delegate (BusRoute route) {
                            route.TicketPrice = utilityService.ConvertCurrency(route.TicketPrice, "USD", currency);
                        });
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
        public IHttpActionResult Post([FromBody]BusRoute route) {
            _repository.InsertOne(route);
            return Ok();
        }

        [Route("{Id}")]
        [HttpPut]
        public IHttpActionResult Put(string Id, [FromBody]BusRoute route) {
            _repository.ReplaceOne(Id, route);
            return Ok();
        }

        [Route("{Id}")]
        [HttpDelete]
        public IHttpActionResult Delete(string Id) {
            _repository.Delete(Id);
            return Ok();
        }
    }
}