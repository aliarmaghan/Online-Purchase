using bewitching.AuthenticationSvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BeWitcHinG.Areas.Admin.Controllers
{
    [UserAuthentication(AccessLevel = "Admin")]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}