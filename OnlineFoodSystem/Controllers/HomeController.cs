using OnlineFoodSystem.Models;
using OnlineFoodSystem.Models.Admin;
using OnlineFoodSystem.Models.DataBaseModel;
using OnlineFoodSystem.Models.Home;
using OnlineFoodSystem.ViewModels.Home;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OnlineFoodSystem.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Payment()
        {
            return View();
        }
        public JsonResult GetItems()
        {
                var data = ItemViewModel.GetItemsData();
                return Json(new { result = data }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult getProductCategories()
        {
            var categories = CategoryModel.GetCategory();
            return new JsonResult { Data = categories, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        public JsonResult GetProductsById(int id)
        {
            using (FoodOrderDbContext db = new FoodOrderDbContext())
            {
                var catName = db.Categories.Where(s=>s.catId == id).Select(s => s.name).FirstOrDefault();

                var data = ItemViewModel.GetItemsData(id);
                return Json(new { Data = data, CategoryName = catName }, JsonRequestBehavior.AllowGet );
            }

        }
        public ActionResult ProductDetail()
        {
            return View();
        }
        public ActionResult CheckOut()
        {
            using (FoodOrderDbContext db = new FoodOrderDbContext())
            {
                if (Session["UserId"] != null)
                {
                    int id = Convert.ToInt32(Session["UserId"].ToString());
                    var totalRecords = db.Orders.Where(s => s.userId == id).ToList();
                    decimal totalAmount = 0;
                    foreach (var item in totalRecords)
                    {
                        totalAmount += Convert.ToDecimal(item.totalPrice);
                    }
                    ViewBag.Amount = totalAmount;

                    return View(OrderDetailModel.GetOrderData(id));
                }
                return RedirectToAction("Index", "Home");
            }
        }

        [HttpPost]
        public JsonResult SavePaymentRecord(IList<OrderNow> values)
        {
            if (values != null)
            {
                decimal amount = GeneralModel.GetTotalAmount(values);
                var response = ChargeCreditCard.Run(amount);
                if (response.refId != null)
                {
                    Order newOrder = new Order();
                    newOrder.userId = Convert.ToInt32(Session["UserId"].ToString());
                    newOrder.dateTime = DateTime.Now.ToString("HH:mm tt dd/MM/yyyy");
                    newOrder.status = "Pending";
                    newOrder.totalPrice = amount.ToString();
                    newOrder.transId = response.refId;

                    using (FoodOrderDbContext db = new FoodOrderDbContext())
                    {
                        db.Orders.Add(newOrder);
                        db.SaveChanges();
                    }

                    foreach (var item in values)
                    {
                        decimal itemid = GeneralModel.GetItemID(item.Name);
                        decimal orderId = GeneralModel.GetOrderId();
                        decimal quantity = item.count;
                        GeneralModel.SavetoItemDetials(itemid, orderId, quantity);
                        GeneralModel.UpdateQuantity(itemid, quantity);

                    }

                }
                return Json(new { result = 1 }, JsonRequestBehavior.AllowGet);
            }

            return Json(new { result = 0 }, JsonRequestBehavior.AllowGet);
        }


        public ActionResult ShopingCart()
        {
            return View();
        }


    }
}