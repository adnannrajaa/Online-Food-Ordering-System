//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace OnlineFoodSystem.Models.DataBaseModel
{
    using System;
    using System.Collections.Generic;
    
    public partial class OrderDetail
    {
        public decimal orderDetailId { get; set; }
        public decimal orderId { get; set; }
        public decimal itemId { get; set; }
        public string quantity { get; set; }
    
        public virtual Order Order { get; set; }
        public virtual FoodItem FoodItem { get; set; }
    }
}