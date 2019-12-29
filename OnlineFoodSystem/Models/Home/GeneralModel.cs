using OnlineFoodSystem.Models.DataBaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineFoodSystem.Models.Home
{
    public class GeneralModel
    {
        public static void UpdateQuantity(decimal itemid, decimal quantity)
        {
            using (FoodOrderDbContext db = new FoodOrderDbContext())
            {
                decimal Updatedquantity = GetUpdatedQuantity(quantity, itemid);
                FoodItem updateItem = db.FoodItems.Find(itemid);
                updateItem.quantity = Convert.ToInt32(Updatedquantity);
                db.SaveChanges();
            }
        }

        public static decimal GetUpdatedQuantity(decimal quantity, decimal itemid)
        {
            decimal updateQuantity = 0;

            using (FoodOrderDbContext db = new FoodOrderDbContext())
            {
                var TotalQuantity = db.FoodItems.Where(s => s.itemId == itemid).Select(s => s.quantity).FirstOrDefault();
                updateQuantity = Convert.ToDecimal(TotalQuantity) - quantity;
            }
            return updateQuantity;

        }

        public static void SavetoItemDetials(decimal itemid, decimal orderId, decimal quantity)
        {
            using (FoodOrderDbContext db = new FoodOrderDbContext())
            {
                OrderDetail orderD = new OrderDetail();
                orderD.itemId = itemid;
                orderD.orderId = orderId;
                orderD.quantity = quantity.ToString();

                db.OrderDetails.Add(orderD);
                db.SaveChanges();
            }
        }

        public static decimal GetOrderId()
        {
            decimal id = 0;
            using (FoodOrderDbContext db = new FoodOrderDbContext())
            {
                id = db.Orders.OrderByDescending(s => s.orderId).Select(s => s.orderId).FirstOrDefault();
            }
            return id;
        }

        public static decimal GetItemID(string name)
        {
            decimal id = 0;
            using (FoodOrderDbContext db = new FoodOrderDbContext())
            {
                id = db.FoodItems.Where(s => s.name.Contains(name)).Select(s => s.itemId).FirstOrDefault();
            }
            return id;
        }

        public static decimal GetTotalAmount(IList<OrderNow> values)
        {
            decimal amount = 0;
            foreach (var item in values)
            {
                amount += item.count * item.price;
            }
            return amount;
        }
    }
}