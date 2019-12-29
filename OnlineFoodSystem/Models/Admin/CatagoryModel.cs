using OnlineFoodSystem.Models.DataBaseModel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace OnlineFoodSystem.Models.Admin
{
    public class CatagoryModel
    {

        public decimal? CategoryId { get; set; }
        public string CategoryName { get; set; }

    }
}