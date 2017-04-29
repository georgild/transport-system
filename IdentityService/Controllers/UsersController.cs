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

    [RoutePrefix("api/v1/users")]
    public class UsersController : ApiController {

        private static UserRepository _userRepo;

        public UsersController() {
            _userRepo = new UserRepository();
        }

        [AuthFilter]
        [Route("")]
        public List<User> Get() {
            
            User fake = new User { UserName = "admin" };
            return new List<User> { fake };
        }
    }
}