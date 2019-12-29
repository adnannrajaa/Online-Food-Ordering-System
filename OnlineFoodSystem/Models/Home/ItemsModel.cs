using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineFoodSystem.Models.Home
{
    public class ItemsModel
    {
        public decimal itemId { get; set; }
        public string name { get; set; }
        public string image { get; set; }
        public string price { get; set; }
        public int quantity { get; set; }

        //public decimal catId { get; set; }
        //public string description { get; set; }
        //public bool isEnabled { get; set; }
        //public bool isDeleted { get; set; }
    }
}