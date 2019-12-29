using OnlineFoodSystem.Models.Account;
using OnlineFoodSystem.Models.DataBaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OnlineFoodSystem.Controllers
{
    public class AccountController : Controller
    {
        // GET: Account
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public JsonResult Login(SignInModel data)
        {

            bool isAuthenciated = SignInModel.VerifyUserNameAndPassword(data.email, data.password);
            if (isAuthenciated)
            {
                Session["Email"] = data.email;
                Session["UserId"] = SignInModel.GetUserId(data.email);
                if ((data.email).ToLower() == "admin")
                {
                    return Json(new { result = 2 }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { result = 1 }, JsonRequestBehavior.AllowGet);

            }
            return Json(new { result = 0 }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult SignUp()
        {
            return View();
        }
        [HttpPost]
        public ActionResult registerUser(SignUpModel _model)
        {
            SignUpModel.SaveRecord(_model);
            return Json(new { result = true }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult isUserExist(string UserName)
        {
            var status = false;
            using (FoodOrderDbContext db = new FoodOrderDbContext())
            {
                var result = db.Users.Where(s => (s.username == UserName)).Count();
                if(result >0)
                {
                    status = true;
                }
            }
            return Json(new { result=status }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult IsEmailExist(string Email)
        {
            var status = false;
            using (FoodOrderDbContext db = new FoodOrderDbContext())
            {
                var result = db.Users.Where(s => (s.email == Email)).Count();
                if (result > 0)
                {
                    status = true;
                }
            }
            return Json(new { result=status }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult SignOut()
        {
            Session["Email"] = null;
            Session["UserId"] = null;
            return RedirectToAction("Index","Home");
        }

        public JsonResult IsUserLogin()
        {
            if(Session["Email"] == null)
            {
                return Json(new { result = false }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { result = true }, JsonRequestBehavior.AllowGet);
        }
    }
}