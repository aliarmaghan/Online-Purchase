﻿using bewitching.AuthenticationSvc;
using BeWitcHinG.App_Start;
using BusinessService;
using BusinessService.Helper;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using ModelServices.AdminModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace BeWitcHinG.Areas.Admin.Controllers
{
    [UserAuthentication(AccessLevel = "Admin")]
    public class ProfileController : Controller
    {
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;
        UserProfileSvc _userProfileSvc = new UserProfileSvc();
        MasterDataSvc masterDataSvc = new MasterDataSvc();

        AuthSvc authSvc = new AuthSvc();
        CookiesSvc cookie = new CookiesSvc();

        public ProfileController()
        {

        }
        public ProfileController(ApplicationUserManager userManager, ApplicationSignInManager signInManager)
        {
            UserManager = userManager;
            SignInManager = signInManager;

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

        // GET: Admin/Profile
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public async Task<ActionResult> ChangePassword()
        {
            await Task.Delay(0);
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> ChangePassword(ChangePasswordModel model, string id)
        {
            await Task.Delay(0);
            try
            {
                if (!ModelState.IsValid)
                {
                    return View(model);

                }
                string userId = await GetLoggedInUserName();
                var user = await UserManager.FindByIdAsync(userId);
                if (user == null)
                {
                    return RedirectToAction("AccessDenied", "Account", new { area = "Admin" });
                }
                var result = await UserManager.ChangePasswordAsync(user.Id, model.OldPassword, model.NewPassword);
                if (result.Succeeded)
                {
                    TempData["SuccessMessage"] = "Password Changed Sucessfully";
                    TempData["ResponseMessage"] = "Password Changed Sucessfully!";
                    TempData["ResponseValue"] = 1;
                    return RedirectToAction("Login", "Account", new { area = "Admin" });
                }
                else
                {
                    //TempData["ErrorMessage"] = result.Errors.FirstOrDefault();
                    TempData["ResponseMessage"] = "Password could not Changed . Please enter Correct old Password";
                    TempData["ResponseValue"] = 0;

                }
            }
            catch (Exception)
            {
                //TempData["ErrorMessage"] = "Please check valid credential!";
                TempData["ResponseMessage"] = "Profile could not updated. Please contact to support team";
                TempData["ResponseValue"] = 0;
            }



            return View(model);

        }
        [HttpGet]
        public async Task<ActionResult> UpdateUserProfile()
        {
            await Task.Delay(0);
            string userId = await GetLoggedInUserName();
            var user = await UserManager.FindByIdAsync(userId);
            if (user == null)
            {
                return RedirectToAction("AccessDenied", "Account", new { area = "Admin" });
            }

            
            var model = await _userProfileSvc.GetUserProfileData(user.Id);
            var Cmodel = await masterDataSvc.CountryList();
            var Smodel = await masterDataSvc.StateList();
            var CTmodel = await masterDataSvc.CityList();
            model.countryModels = Cmodel;
            model.cityModels = CTmodel;
            model.stateModels = Smodel;

            return View(model);

        }
        [HttpPost]
        public async Task<ActionResult> UpdateUserProfile(UserProfileModel model)
        {
            await Task.Delay(0);
            var Cmodel = await masterDataSvc.CountryList();
            var Smodel = await masterDataSvc.StateList();
            var CTmodel = await masterDataSvc.CityList();
            model.countryModels = Cmodel;
            model.cityModels = CTmodel;
            model.stateModels = Smodel;

            if (ModelState.IsValid)
            {
                bool isImageType = false;

                // CREATING STRING ARRAY FOR CHECKING IMAGE
                string[] imagesCheck = { ".png", ".jpg", ".jpeg" };

                // GETTING FILE DATA FROM REQUESTED POST
                HttpPostedFileBase getFile = Request.Files["ImageData"];

                if (getFile != null && getFile.ContentLength > 0)
                {
                    // GETTING FILE EXTENSTION
                    string extension = Path.GetExtension(getFile.FileName);

                    // CHECKING FILE EXTENSION
                    for (int i = 0; i < imagesCheck.Length; i++)
                    {
                        if (extension.ToLower() == imagesCheck[i])
                        {
                            isImageType = true;
                            break;
                        }
                    }

                    if (!isImageType)
                    {

                        TempData["ResponseMessage"] = "Please upload file in image format {png, jpg, jpeg}!";
                        TempData["ResponseValue"] = 0;

                        return View(model);
                    }

                    // CREATING FOLDER OR DIRECTORY IN SOLUTION
                    string imagePath = "/Image/profile/";

                    bool exists = Directory.Exists(Server.MapPath(imagePath));

                    if (!exists)
                        Directory.CreateDirectory(Server.MapPath(imagePath));

                    // GIVING NEW NAME TO FILE
                    string fileNewName = "profile" + "_" + DateTime.Now.ToString("ddMMMyyyyhhmmss") + extension;
                    // GETTING SERVER PATH TO SAVE
                    string pathToSave = Path.Combine(Server.MapPath(imagePath), fileNewName);
                    // GETTING PATH TO SAVE IN DATABASE

                    model.PROFICPATH = imagePath + fileNewName + "";

                    getFile.SaveAs(pathToSave);

                }



                string userId = await GetLoggedInUserName();
                var user = await UserManager.FindByIdAsync(userId);
                if (user == null)
                {
                    return RedirectToAction("AccessDenied", "Account", new { area = "Admin" });
                }
                string jsonData = JsonConvert.SerializeObject(model);

                bool Istrue = await _userProfileSvc.UpdateUserProfileData(jsonData);
                if (Istrue)
                {
                    TempData["ResponseMessage"] = "Profile has been upadted Succesfully!";
                    TempData["ResponseValue"] = 1;
                }
                else
                {
                    TempData["ResponseMessage"] = "Profile could not updated. Please contact to support team";
                    TempData["ResponseValue"] = 0;
                }
            }
            
            return View(model);
        }
        private async Task<string> GetLoggedInUserName()
        {
            await Task.Delay(0);
            var key = cookie.GetCookiesValue("user_id");
            string UserId = authSvc.DecryptToken(key);

            return UserId;
        }
    }
}