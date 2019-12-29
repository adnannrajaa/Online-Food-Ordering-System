using OnlineFoodSystem.Models.Admin;
using OnlineFoodSystem.Models.DataBaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineFoodSystem.ViewModels.Admin
{
    public class TranscationViewModel
    {
        public IEnumerable<OrderModel> Order { get; set; }

        public static TranscationViewModel GetTranscationData()
        {
            using (FoodOrderDbContext db = new FoodOrderDbContext())
            {
                var orderOrder = new TranscationViewModel
                {
                    Order = db.Orders.Join(db.Users, o => o.userId, u => u.userId, (o, u) => new
                    { o, u }).OrderByDescending(s => s.o.dateTime).Take(20).Select(s => new OrderModel
                    {
                        orderId = s.o.orderId,
                        CustomerName = s.u.username,
                        TranscationId = s.o.transId,
                        dateTime = s.o.dateTime,
                        status = s.o.status,
                        totalPrice = s.o.totalPrice,
                    }).ToList()


                };
                return orderOrder;
            }

        }
    }
}