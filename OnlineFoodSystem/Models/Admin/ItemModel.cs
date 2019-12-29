using OnlineFoodSystem.Models.DataBaseModel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace OnlineFoodSystem.Models.Admin
{
    public class ItemModel
    {
        public decimal itemId { get; set; }
        public decimal catId { get; set; }
        public string name { get; set; }
       
        public string description { get; set; }
        public string price { get; set; }
        public int quantity { get; set; }
        public bool isEnabled { get; set; }
        public bool isDeleted { get; set; }

        public string image { get; set; }
        [NotMapped]
        public HttpPostedFileBase ImageUpload { get; set; }      
    }
}