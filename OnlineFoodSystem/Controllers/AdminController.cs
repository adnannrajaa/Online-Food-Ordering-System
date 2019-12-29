using OnlineFoodSystem.Models.Admin;
using OnlineFoodSystem.Models.DataBaseModel;
using OnlineFoodSystem.ViewModels.Admin;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml.Linq;

namespace OnlineFoodSystem.Controllers
{

    public class AdminController : Controller
    {
        // GET: Admin
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult ViewCategory()
        {
            return View();
        }

        public ActionResult ViewItem()
        {
            return View();

        }

        public ActionResult ViewOrders()
        {
            return View();
        }

        public ActionResult ViewUsers()
        {
            return View();
        }

        public ActionResult ViewTransaction()
        {
            return View();
        }

        //.......................................Category Section start.......................
        [HttpGet]
        public JsonResult GetCategory()
        {
            var data = CategoryViewModel.GetCatagoryData();
            return Json(new { result = data }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult VerifyCategory(string CategoryName)
        {
            bool AlreadyExist = CategoryViewModel.VerifyCategory(CategoryName);
            if (AlreadyExist)
            {
                return Json(new { result = true }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { result = false }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult AddNewCategory(string CategoryName)
        {
            using (FoodOrderDbContext db = new FoodOrderDbContext())
            {
                Category cat = new Category();
                cat.name = CategoryName;
                db.Categories.Add(cat);
                db.SaveChanges();
            }
            return Json(new { result = true }, JsonRequestBehavior.AllowGet);
        }
       
        //............................................Category Section End............................


        //.........................................Food Items Start.........................

        [HttpGet]
        public JsonResult GetFoodItems()
        {
            var data = ItemsViewModel.GetItemData();
            return Json(new { result = data }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult EnableDisable(int id)
        {
            bool status = false;
            using (FoodOrderDbContext db = new FoodOrderDbContext())
            {

                var finddata = db.FoodItems.Find(id);
                if (finddata.isEnabled == true)
                {
                    finddata.isEnabled = false;
                }
                else
                {
                    finddata.isEnabled = true;
                    status = true;
                }

                db.SaveChanges();

            }
            return new JsonResult { Data = status, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }

        [HttpPost]
        public ActionResult DeleteItem(int id)
        {
            using (FoodOrderDbContext db = new FoodOrderDbContext())
            {
                var finddata = db.FoodItems.Find(id);
                finddata.isDeleted = true;
                db.SaveChanges();

            }
            return new JsonResult { Data = true, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }

        [HttpPost]
        public JsonResult SaveNewFoodItem(ItemModel ItemData)
        {

            using (FoodOrderDbContext db = new FoodOrderDbContext())
            {
                if (ItemData.ImageUpload != null)
                {
                    UploadSelectedImage(ItemData);
                }

                FoodItem addnewItem = new FoodItem();
                addnewItem.catId = ItemData.catId;
                addnewItem.name = ItemData.name;
                addnewItem.description = ItemData.description;
                addnewItem.price = ItemData.price;
                addnewItem.quantity = ItemData.quantity;
                addnewItem.image = ItemData.image;
                addnewItem.isEnabled = true;
                db.FoodItems.Add(addnewItem);
                db.SaveChanges();
                return Json(new { status = true }, JsonRequestBehavior.AllowGet);
            }
        }

        public bool VerifyImage(string Image)
        {
            string fileName = Path.GetFileNameWithoutExtension(Image);
            string extension = Path.GetExtension(Image);
            if (extension == ".png" || extension == ".jpg" || extension == ".jpeg")
            {
                return true;
            }
            return false;

        }
        public ActionResult EditPrice(string Price, int itemId)
        {
            using (FoodOrderDbContext db = new FoodOrderDbContext())
            {
                FoodItem updateprice = db.FoodItems.Find(itemId);
                updateprice.price = Price;
                db.SaveChanges();
                return new JsonResult { Data = true, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }

        }
        private bool GetImageVerification(ItemModel ItemData)
        {
            string fileName = Path.GetFileNameWithoutExtension(ItemData.ImageUpload.FileName);
            string extension = Path.GetExtension(ItemData.ImageUpload.FileName);
            if (extension == ".png" || extension == ".jpg" || extension == ".jpeg")
            {
                return true;
            }
            return false;
        }
        private void UploadSelectedImage(ItemModel UsersModel)
        {
            string fileName = Path.GetFileNameWithoutExtension(UsersModel.ImageUpload.FileName);
            string extension = Path.GetExtension(UsersModel.ImageUpload.FileName);
            fileName = fileName + DateTime.Now.ToString("yymmssfff") + extension;
            UsersModel.image =  fileName;
            UsersModel.ImageUpload.SaveAs(Path.Combine(Server.MapPath("~/AppFiles/Images/"), fileName));


        }

       
        //...............................................Food Item End..........................



        //.......................................................Orders Section Start..............
        [HttpGet]
        public  JsonResult GetTodaysOrders()
        {
            var data = TodaysOrder.GetObjectData();
            return Json(new { result = data }, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public JsonResult  GetOrderDeatail()
        {
            var data = OrderDetailModel.GetOrderData();
            return new JsonResult { Data = data, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        public JsonResult GetOrderDetail(int id)
        {
            List<OrderItemDetailModel> ItemDetail = new List<OrderItemDetailModel>();
            using (FoodOrderDbContext db = new FoodOrderDbContext())
            {
                var Result = db.OrderDetails.Join(db.FoodItems, o => o.itemId, f => f.itemId, (o, f) => new
                { o, f }
                ).Where(s => s.o.orderId == id).Select(s => new OrderItemDetailModel
                {
                    Name = s.f.name,
                    description = s.f.description,
                    Image = s.f.image,
                    Price = s.f.price,
                    Quantity = s.o.quantity
                }).ToList();
                ItemDetail = Result;
            }
            return new JsonResult { Data = ItemDetail, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        [HttpPost]
        public ActionResult OrderDeliver(int id)
        {
            var OrderDelivered = 0; var OrderPending = 0;
            using (FoodOrderDbContext db = new FoodOrderDbContext())
            {
                var finddata = db.Orders.Find(id);
                finddata.status = "Complete";
                db.SaveChanges();

                OrderDelivered = db.Orders.Where(s => s.status == "Complete").Count();
                OrderPending = db.Orders.Where(s => s.status != "Complete").Count();

            }
            return Json(new { OrderDeliver = OrderDelivered, OrderPending = OrderPending, Data = true, JsonRequestBehavior = JsonRequestBehavior.AllowGet });
        }

        //..........................................................Order Section End..........



        //...........................................Transcation Section.............
        [HttpGet]
        public JsonResult GetTranscation()
        {
            var data = TranscationViewModel.GetTranscationData();
            return Json(new { result = data }, JsonRequestBehavior.AllowGet);
        }
        //...........................................Transcation Section End.............

        //............................................Users Section...................

        [HttpGet]
        public JsonResult GetUsers()
        {
            var data = UserViewModel.GetUserDetails();
            return Json(new { result = data }, JsonRequestBehavior.AllowGet);
        }
        //............................................Users Section End...................


    }
}