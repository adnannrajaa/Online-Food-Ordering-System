using OnlineFoodSystem.Models.DataBaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineFoodSystem.Models.Admin
{
    public class TodaysOrder
    {
        public int OrderDelivered { get; set; }
        public int OrderPending { get; set; }
        public int TotalItems { get; set; }
        public int TotalUsers { get; set; }

     
        public IEnumerable<OrderModel> Order { get; set; }

        public static TodaysOrder GetObjectData()
        {
            using (FoodOrderDbContext db = new FoodOrderDbContext())
            {
                var todaydate = DateTime.Now.ToString("dd/MM/yyyy");
                var TodaysOrder = new TodaysOrder
                {
                    TotalItems = db.FoodItems.Where(s => s.isEnabled == true).Count(),
                    TotalUsers = db.Users.Count(),
                    OrderDelivered = db.Orders.Where(s => s.status == "Complete").Count(),
                    OrderPending = db.Orders.Where(s => s.status != "Complete").Count(),

                    Order = db.Orders.Join(db.Users, o => o.userId, u => u.userId, (o, u) => new
                    { o, u }).OrderByDescending(s => s.o.status == "Pending").Where(s => s.o.dateTime.Contains(todaydate)).Select(s => new OrderModel
                    {
                        orderId = s.o.orderId,
                        CustomerName = s.u.username,
                        dateTime = s.o.dateTime,
                        status = s.o.status,
                        totalPrice = s.o.totalPrice,
                    }).ToList()


                };
                return TodaysOrder;
            }
        }






    }
}