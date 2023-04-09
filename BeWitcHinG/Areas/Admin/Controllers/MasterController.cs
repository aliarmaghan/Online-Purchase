using BeWitcHinG.App_Start;
using bewitching.AuthenticationSvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity.Owin;
using System.Threading.Tasks;
using ModelServices.AdminModel;
using Newtonsoft.Json;
using BusinessService;
using BusinessService.Helper;
using ModelServices;
using System.Net;

namespace BeWitcHinG.Areas.Admin.Controllers
{
    [UserAuthentication(AccessLevel = "Admin")]
    public class MasterController : Controller
    {
        private ApplicationUserManager _userManager;
        AuthSvc authSvc = new AuthSvc();
        CookiesSvc cookie = new CookiesSvc();
        CountrySvc countrySvc = new CountrySvc();
        StateSvc stateSvc = new StateSvc();
        CitySvc citySvc = new CitySvc();
        MasterDataSvc masterData = new MasterDataSvc();
        CategorySvc categorySvc = new CategorySvc();
        GenderSvc genderSvc = new GenderSvc();
        BrandSvc brandSvc = new BrandSvc();
        Response _response = new Response();
        public MasterController()
        {

        }
        public MasterController(ApplicationUserManager userManager)
        {
            UserManager = userManager;
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
        // GET: Admin/Master
        public ActionResult Index()
        {
            return View();
        }

        #region COUNTRY Curd
        [HttpGet]
        public async Task<ActionResult> Country(int? id = 0)
        {
            await Task.Delay(0);

            var model = await countrySvc.GetCountryList(id);

            return View(model);

        }

        [HttpGet]
        public async Task<ActionResult> AddCountry()
        {
            await Task.Delay(0);

            return View();

        }


        [HttpPost]
        public async Task<ActionResult> AddCountry(CountryModel model)
        {
            ModelState.Remove("ID");

            await Task.Delay(0);
            if (ModelState.IsValid)
            {
                string userId = await GetLoggedInUserId();
                var user = await UserManager.FindByIdAsync(userId);
                if (user == null)
                {
                    return RedirectToAction("AccessDenied", "Account", new { area = "Admin" });
                }
                model.USERID = user.Id;
                var jsonCountry = JsonConvert.SerializeObject(model);

                bool result = await genderSvc.AddGender(jsonCountry);

                if (result)
                {
                    if (model.ID > 0 )
                    {
                        TempData["ResponseMessage"] = "Country has been Created Succesfully!";
                        TempData["ResponseValue"] = 1;
                    }
                    else
                    {
                        TempData["ResponseMessage"] = "Country has been Created Succesfully!";
                        TempData["ResponseValue"] = 1;
                    }
                    return RedirectToAction("Country", "Master", new { area = "Admin" });
                }
                else
                {
                    TempData["ResponseMessage"] = "Country could not Created. Please contact to support team";
                    TempData["ResponseValue"] = 0;
                }
                    
            }

            return View(model);

        }
        public async Task<ActionResult> EditCountry(int id)
        {
            var model = await countrySvc.GetCountryList(id);
            return View(model.FirstOrDefault());

        }

        public async Task<ActionResult> DeleteCountry(int id)
        {
            //await Task.Delay(0);

            bool result = await countrySvc.DeleteCountry(id);

            if (result)
            {
                TempData["ResponseMessage"] = "Country has been Deleted Succesfully!";
                TempData["ResponseValue"] = 1;

                return RedirectToAction("Country", "Master", new { area = "Admin" });
            }
            else
            {
                TempData["ResponseMessage"] = "Country could not delete. Please contact to support team";
                TempData["ResponseValue"] = 0;

                return RedirectToAction("Country", "Master", new { area = "Admin" });
            }

        }
        #endregion


        #region State Curd
        [HttpGet]
        public async Task<ActionResult> State(int? id = 0)
        {
            await Task.Delay(0);

            var model = await stateSvc.GetStateList(id);

            return View(model);

        }
        [HttpGet]
        public async Task<ActionResult> AddState()
        {
            StateModel sModel = new StateModel();
            var model = await masterData.CountryList();
            sModel.countryModels = model;

            return View(sModel);

        }
        [HttpPost]
        public async Task<ActionResult> AddState(StateModel model)
        {


            var modelCountry = await masterData.CountryList();


            ModelState.Remove("ID");

            await Task.Delay(0);
            if (ModelState.IsValid)
            {
                string userId = await GetLoggedInUserId();
                var user = await UserManager.FindByIdAsync(userId);
                if (user == null)
                {
                    return RedirectToAction("AccessDenied", "Account", new { area = "Admin" });
                }
                model.USERID = user.Id;
                var jsonState = JsonConvert.SerializeObject(model);

                bool result = await stateSvc.AddState(jsonState);

                if (result)
                {
                    if (model.STATEID > 0)
                    {
                        TempData["ResponseMessage"] = "State has been Updated Succesfully!";
                        TempData["ResponseValue"] = 1;
                    }
                    else
                    {
                        TempData["ResponseMessage"] = "State has been Created Succesfully!";
                        TempData["ResponseValue"] = 1;
                    }

                    return RedirectToAction("State", "Master", new { area = "Admin" });
                }
                else
                {
                    TempData["ResponseMessage"] = "State could not Created. Please contact to support team";
                    TempData["ResponseValue"] = 0;
                }
            }
            model.countryModels = modelCountry;
            return View(model);

        }

        public async Task<ActionResult> EditState(int id)
        {
            var modelCountry = await masterData.CountryList();
            var model = await stateSvc.GetStateList(id);
            var result = model.FirstOrDefault();
            result.countryModels = modelCountry;
            return View(result);

        }
        public async Task<ActionResult> DeleteState(int id)
        {
            //await Task.Delay(0);

            bool result = await stateSvc.DeleteState(id);

            if (result)
            {
                TempData["ResponseMessage"] = "State has been Deleted Succesfully!";
                TempData["ResponseValue"] = 1;

                return RedirectToAction("State", "Master", new { area = "Admin" });
            }
            else
            {
                TempData["ResponseMessage"] = "State could not delete. Please contact to support team";
                TempData["ResponseValue"] = 0;

                return RedirectToAction("State", "Master", new { area = "Admin" });
            }

        }
        #endregion


        #region City Curd
        [HttpGet]
        public async Task<ActionResult> City(int? id = 0)
        {
            await Task.Delay(0);

            var model = await citySvc.GetCityList(id);

            return View(model);

        }
        
        [HttpGet]
        public async Task<ActionResult> AddCity()
        {
            CityModel cModel = new CityModel();
            var model = await masterData.StateList();
            cModel.stateModels = model;

            return View(cModel);

        }
        [HttpPost]
        public async Task<ActionResult> AddCity(CityModel model)
        {


            //var modelCountry = await masterData.CountryList();
            var modelState = await masterData.StateList();


            //ModelState.Remove("ID");

            await Task.Delay(0);
            if (ModelState.IsValid)
            {
                string userId = await GetLoggedInUserId();
                var user = await UserManager.FindByIdAsync(userId);
                if (user == null)
                {
                    return RedirectToAction("AccessDenied", "Account", new { area = "Admin" });
                }
                model.USERID = user.Id;
                var jsonCity = JsonConvert.SerializeObject(model);

                bool result = await citySvc.AddCity(jsonCity);

                if (result)
                {
                    if (model.CITYID > 0)
                    {
                        TempData["ResponseMessage"] = "City has been Updated Succesfully!";
                        TempData["ResponseValue"] = 1;
                    }
                    else
                    {
                        TempData["ResponseMessage"] = "City has been Created Succesfully!";
                        TempData["ResponseValue"] = 1;
                    }

                    return RedirectToAction("City", "Master", new { area = "Admin" });
                }
                else
                {
                    TempData["ResponseMessage"] = "City could not Created. Please contact to support team";
                    TempData["ResponseValue"] = 0;
                }
            }
            model.stateModels = modelState;
            return View(model);

        }
        public async Task<ActionResult> EditCity(int id)
        {
            var modelState = await masterData.StateList();
            var model = await citySvc.GetCityList(id);
            var result = model.FirstOrDefault();
            result.stateModels = modelState;
            return View(result);

        }
        public async Task<ActionResult> DeleteCity(int id)
        {
            //await Task.Delay(0);

            bool result = await citySvc.DeleteCity(id);

            if (result)
            {
                TempData["ResponseMessage"] = "City has been Deleted Succesfully!";
                TempData["ResponseValue"] = 1;

                return RedirectToAction("City", "Master", new { area = "Admin" });
            }
            else
            {
                TempData["ResponseMessage"] = "City could not delete. Please contact to support team";
                TempData["ResponseValue"] = 0;

                return RedirectToAction("City", "Master", new { area = "Admin" });
            }

        }




        #endregion

        #region Category
        [HttpGet]
        public async Task<ActionResult> Category(int? id)
        {
            CategoryBaseModel categoryBaseModel = new CategoryBaseModel();

            await Task.Delay(0);
            var model = await categorySvc.GetCategoryList(id);
            categoryBaseModel.Categories = model;
            return View(categoryBaseModel);
        }

        // ajax call
        [HttpPost]
        [AjaxOnly]
        public async Task<ActionResult> AddCategory(CategoryBaseModel model)
        {
            Response _response = new Response();

            string userId = await GetLoggedInUserId();
            var user = await UserManager.FindByIdAsync(userId);

            if (user != null)
            {
                model.USERID = user.Id;

                var jsonString = JsonConvert.SerializeObject(model);

                bool isTrue = await categorySvc.AddCategory(jsonString);

                if (isTrue)
                {
                    if(model.CATEGORY_ID > 0)
                    {
                        _response.Message = "Category has been Updated Succesfully!";
                        _response.StatusCode = HttpStatusCode.OK;
                    }
                    else
                    {
                        _response.Message = "Category has been Created Succesfully!";
                        _response.StatusCode = HttpStatusCode.OK;
                    }
                    
                }
                else
                {
                    _response.Message = "Category could not created! Please contact to admin";
                    _response.StatusCode = HttpStatusCode.BadRequest;
                }
            }
            else
            {
                _response.Message = "Your are not authorize to access or manipulate data";
                _response.StatusCode = HttpStatusCode.Unauthorized;
            }

            return Json(_response, JsonRequestBehavior.AllowGet);

        }

        // ajax call
        [HttpGet]
        [AjaxOnly]
        public async Task<ActionResult> GetCategoryList(int? id = 0)
        {

            Response _response = new Response();
            var model = await categorySvc.GetCategoryList(id);

            _response.Message = "Fetched Successfully.";
            _response.StatusCode = HttpStatusCode.OK;
            _response.Data = JsonConvert.SerializeObject(model);

            return Json(_response, JsonRequestBehavior.AllowGet);

        }
        [AjaxOnly]
        [HttpPost]
        public async Task<ActionResult> DeleteCategory(int id)
        {
            //await Task.Delay(0);
            Response _response = new Response();

            bool result = await categorySvc.DeleteCategory(id);

            if (result)
            {
                _response.Message = "Category has been Deleted Succesfully!";
                _response.StatusCode = HttpStatusCode.OK;
            }
            else
            {
                _response.Message = "Category could not delete. Please contact to support team";
                _response.StatusCode = HttpStatusCode.OK;
            }
            return Json(_response, JsonRequestBehavior.AllowGet);
        }

        #endregion


        #region Gender curd
        [HttpGet]
        public async Task<ActionResult> Gender(int ? id)
        {
            GenderBaseModel genderBaseModel = new GenderBaseModel();
            await Task.Delay(0);
            var model = await genderSvc.GetGenderList(id);
            genderBaseModel.Genders = model;
            return View(genderBaseModel);
        }
    
        // ajax call
        [HttpPost]
        [AjaxOnly]
        public async Task<ActionResult> AddGender(GenderModel model)
        {
            
            ModelState.Remove("ID");

            string userId = await GetLoggedInUserId();
            var user = await UserManager.FindByIdAsync(userId);

            if (user != null)
            {
                model.USERID = user.Id;

                var jsonString = JsonConvert.SerializeObject(model);

                bool isTrue = await genderSvc.AddGender(jsonString);

                if (isTrue)
                {
                    if (model.ID > 0)
                    {
                        _response.Message = "Gender has been Updated Succesfully!";
                        _response.StatusCode = HttpStatusCode.OK;
                    }
                    else
                    {
                        _response.Message = "Gender has been Created Succesfully!";
                        _response.StatusCode = HttpStatusCode.OK;
                    }

                }
                else
                {
                    _response.Message = "Gender could not created! Please contact to admin";
                    _response.StatusCode = HttpStatusCode.BadRequest;
                }
            }
            else
            {
                _response.Message = "Your are not authorize to access or manipulate data";
                _response.StatusCode = HttpStatusCode.Unauthorized;
            }

            return Json(_response, JsonRequestBehavior.AllowGet);

        }

        // ajax call
        [HttpGet]
        [AjaxOnly]
        public async Task<ActionResult> GetGenderList(int? id = 0)
        {

            var model = await genderSvc.GetGenderList(id);

            _response.Message = "Fetched Successfully.";
            _response.StatusCode = HttpStatusCode.OK;
            _response.Data = JsonConvert.SerializeObject(model);

            return Json(_response, JsonRequestBehavior.AllowGet);

        }


        //public async Task<ActionResult> EditGender(int id)
        //{
        //    var model = await genderSvc.GetGenderList(id);
        //    return View(model.FirstOrDefault());

        //}
        //public async Task<ActionResult> DeleteGender(int id)
        //{
        //    //await Task.Delay(0);

        //    bool result = await genderSvc.DeleteGender(id);

        //    if (result)
        //    {
        //        TempData["ResponseMessage"] = "Gender has been Deleted Succesfully!";
        //        TempData["ResponseValue"] = 1;

        //        return RedirectToAction("Gender", "Master", new { area = "Admin" });
        //    }
        //    else
        //    {
        //        TempData["ResponseMessage"] = "Gender could not delete. Please contact to support team";
        //        TempData["ResponseValue"] = 0;

        //        return RedirectToAction("Gender", "Master", new { area = "Admin" });
        //    }

        //}


        #endregion


        #region Brand curd
        [HttpGet]
        public async Task<ActionResult> Brand(int? id)
        {
            BrandBaseModel brandBaseModel = new BrandBaseModel();

            await Task.Delay(0);
            var model = await brandSvc.GetBrandList(id);
            brandBaseModel.brandList = model;
            return View(brandBaseModel);
        }
        [HttpGet]
        public async Task<ActionResult> AddBrand(int? id)
        {
            await Task.Delay(0);
            return View();
        }

        #endregion


        public async Task<string> GetLoggedInUserId()
        {
            await Task.Delay(0);
            var key = cookie.GetCookiesValue("user_id");
            string UserId = authSvc.DecryptToken(key);

            return UserId;
        }

    }
}