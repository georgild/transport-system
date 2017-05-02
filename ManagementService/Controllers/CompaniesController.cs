using Authorization;
using DataLayer.Repository;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace ManagementService.Controllers {

    [AuthFilter]
    [RoutePrefix("api/v1/companies")]
    public class CompaniesController : ApiController {

        private static BusCompanyRepository _repository;

        public CompaniesController() {
            _repository = new BusCompanyRepository();
        }

        [Route("")]
        [HttpGet]
        public List<Company> Get() {
            return _repository.Find();
        }

        [Route("")]
        [HttpPost]
        public IHttpActionResult Post([FromBody]Company company) {
            _repository.InsertOne(company);
            return Ok();
        }

        [Route("{Id}")]
        [HttpPut]
        public IHttpActionResult Put(string Id, [FromBody]Company company) {
            _repository.ReplaceOne(Id, company);
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