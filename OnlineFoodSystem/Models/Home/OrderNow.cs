using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineFoodSystem.Models.Home
{
    public class OrderNow
    {
        public string Name { get; set; }
        public decimal price { get; set; }
        public int count { get; set; }
    }
}