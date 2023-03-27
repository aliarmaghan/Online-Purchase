using BeWitcHinG.App_Start;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using ModelServices.AdminModel;
using System.Net;
using Microsoft.Owin.Security;
using BeWitcHinG.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using BusinessService;
using Newtonsoft.Json;
using bewitching.AuthenticationSvc;

namespace BeWitcHinG.Areas.Admin.Controllers
{
    public class AccountController : Controller
    {
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;
        UserProfileSvc _userProfileSvc = new UserProfileSvc();
        AuthSvc authSvc = new AuthSvc();
        CookiesSvc cookie = new CookiesSvc();

        public AccountController(ApplicationUserManager userManager, ApplicationSignInManager signInManager)
        {
            UserManager = userManager;
            SignInManager = signInManager;
        }

        public AccountController()
        {

        }
        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set
            {
                _signInManager = value;
            }
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }
        // GET: Admin/Account
        public ActionResult Index()
        {
            return View();
        }
        public async Task<ActionResult> Login()
        {
            await Task.Delay(0);
            return View();
        }
        [HttpPost]
        public async Task<ActionResult> Login(AdminLoginViewModel model)
        {
            try
            {
                // modelstate is used to validate the model if there is any reuired or some other annotation exist and aslo used to trigger the message if it is 
                // mention in the model
                if (ModelState.IsValid)
                {

                    var result = await authSvc.AuthorizeUser(model.Email, model.Password); //await SignInManager.PasswordSignInAsync(userName, model.Password, false, shouldLockout: false);

                    if (result.StatusCode == HttpStatusCode.OK)
                    {
                        const int expireTime = 60;
                        cookie.SetCookie("user_id", result.UserId, expireTime);

                        return RedirectToAction("Index", "Home", new { area = "Admin" });
                    }
                    if (result.StatusCode == HttpStatusCode.Unauthorized)
                    {
                        cookie.DeleteCookie("user_id");
                        TempData["ErrorMessage"] = "Invalid Email/Password";
                        return RedirectToAction("Login", "Account", new { area = "Admin" });

                    }

                    else
                    {
                        cookie.DeleteCookie("user_id");
                        TempData["ErrorMessage"] = "Required Verification from Admin";
                        return RedirectToAction("Login", "Account", new { area = "Admin" });
                    }

                }

                return View(model);

            }
            catch (Exception)
            {

                return RedirectToAction("Login", "Account", new { area = "Admin" });
            }

        }



        private async Task<string> GetLoggedInUserName(string logged_email)
        {
            var userDetails = await UserManager.FindByEmailAsync(logged_email);

            if (userDetails != null)
            {
                return userDetails.UserName;
            }
            return "";
        }

        public ActionResult LogOff()
        {
            cookie.DeleteCookie("user_id");
            TempData["SuccessMessage"] = "You have Successfully log out.";
            return RedirectToAction("Login", "Account", new { area = "Admin" });
        }



        public ActionResult AccessDenied()
        {
            return View();
        }





    }
}