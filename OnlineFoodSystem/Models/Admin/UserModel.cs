using OnlineFoodSystem.Models.DataBaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineFoodSystem.Models.Admin
{
    public class UserModel
    {
        public decimal userId { get; set; }
        public string username { get; set; }
        public string email { get; set; }
    }
}