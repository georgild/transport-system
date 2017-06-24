using DataLayer.Repository;
using Microsoft.Owin.Security.OAuth;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace IdentityService.Providers {
    public class SimpleAuthorizationServerProvider : OAuthAuthorizationServerProvider {

        private static UserRepository _repository;

        public SimpleAuthorizationServerProvider() {
            _repository = new UserRepository();
        }

        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context) {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context) {

            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });

            User user = _repository.Find(context.UserName, context.Password);

            if (null == user) {
                context.SetError("invalid_grant", "The user name or password is incorrect.");
                return;
            }

            var identity = new ClaimsIdentity(context.Options.AuthenticationType);
            identity.AddClaim(new Claim("sub", context.UserName));
            identity.AddClaim(new Claim("role", "user"));

            context.Validated(identity);

        }
    }
}