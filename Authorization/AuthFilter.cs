using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Controllers;

namespace Authorization {
    public class AuthFilter : AuthorizeAttribute {

        public override void OnAuthorization(HttpActionContext actionContext) {
            IPrincipal principal = actionContext.RequestContext.Principal;
            //base.OnAuthorization(actionContext);
        }
    }
}
