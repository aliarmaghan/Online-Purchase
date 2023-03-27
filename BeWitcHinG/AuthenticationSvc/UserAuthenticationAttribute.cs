using BeWitcHinG.App_Start;
using BeWitcHinG.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using ModelServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace bewitching.AuthenticationSvc
{
    public class UserAuthenticationAttribute : AuthorizeAttribute
    {
        CookiesSvc cookies = new CookiesSvc();
        AuthSvc authSvc = new AuthSvc();
        UserAuthorizeModel userAuthorize = new UserAuthorizeModel();
        public string AccessLevel { get; set; }
        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            var userManager = new ApplicationUserManager(new UserStore<ApplicationUser>(new ApplicationDbContext()));

            if (!HttpContext.Current.Request.Cookies.AllKeys.Contains(userAuthorize.User_Id))
            {
                return false;
            }
            var key = cookies.GetCookiesValue(userAuthorize.User_Id);
            string userId = authSvc.DecryptToken(key);

            var user = userManager.FindById(userId);
            if (user == null)
            {
                return false;

            }
            var roles = userManager.GetRoles(user.Id);
            if (roles.FirstOrDefault() != "Admin")
            {
                return false;
            }
            var assignPrevillage = roles.FirstOrDefault();

            return assignPrevillage.Contains(this.AccessLevel);
            //[AuthorizeUser(AccessLevel = "Create")]
        }

        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {

            UserAuthorizeModel userAuthorize = new UserAuthorizeModel();
            cookies.DeleteCookie(userAuthorize.User_Id);
            HttpContext.Current.Response.Headers["WWW-Authenticate"] = $"Not Authorized";
            HttpContext.Current.Response.Redirect("/Admin/Account/AccessDenied");
            base.HandleUnauthorizedRequest(filterContext);
        }
    }
}
