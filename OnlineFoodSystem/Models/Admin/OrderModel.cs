using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineFoodSystem.Models.Admin
{
    public class OrderModel
    {
        public decimal orderId { get; set; }
        public string TranscationId { get; set; }
        public string CustomerName { get; set; }
        public string dateTime { get; set; }
        public string status { get; set; }
        public string totalPrice { get; set; }
    }
}