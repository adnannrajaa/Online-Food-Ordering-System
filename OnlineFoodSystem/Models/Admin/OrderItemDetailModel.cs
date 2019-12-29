using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineFoodSystem.Models.Admin
{
    public class OrderItemDetailModel
    {
        public string Name { get; set; }
        public string description { get; set; }
        public string Quantity { get; set; }
        public string Price { get; set; }
        public string Image { get; set; }

    }
}