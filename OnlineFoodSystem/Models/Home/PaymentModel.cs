using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineFoodSystem.Models.Home
{
    public class PaymentModel
    {
        public string NameOnCard { get; set; }
        public string CardNumber { get; set; }
        public string CVV { get; set; }
        public string ExpirationDate { get; set; }

    }
}