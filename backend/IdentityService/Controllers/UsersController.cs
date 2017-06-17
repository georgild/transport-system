using Authorization;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using DataLayer.Session;
using DataLayer.Repository;

namespace IdentityService.Controllers {

    [AuthFilter]
    [RoutePrefix("api/v1/users")]
    public class UsersController : ApiController {

        private static UserRepository _repository;

        public UsersController() {
            _repository = new UserRepository();
        }

        [Route("")]
        [HttpGet]
        public List<User> Get() {
            return _repository.Find();
        }

        [Route("")]
        [HttpPost]
        public IHttpActionResult Post([FromBody]User user) {
            _repository.InsertOne(user);
            return Ok();
        }

        [Route("{Id}")]
        [HttpPut]
        public IHttpActionResult Put(string Id, [FromBody]User user) {
            _repository.ReplaceOne(Id, user);
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