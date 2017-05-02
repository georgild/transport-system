using Authorization;
using DataLayer.Repository;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Newtonsoft.Json;

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
        public List<BusRoute> Get([FromUri]string filters) {
            List<RequestFilter> parseFilters = JsonConvert.DeserializeObject<List<RequestFilter>>(filters);
            return _repository.Find(parseFilters);
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