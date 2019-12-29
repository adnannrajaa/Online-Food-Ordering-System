using OnlineFoodSystem.Models.DataBaseModel;
using OnlineFoodSystem.Models.Home;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineFoodSystem.ViewModels.Home
{
    public class ItemViewModel
    {
        public IList<ItemsModel> Items { get; set; }
        public static ItemViewModel GetItemsData()
        {
            using (FoodOrderDbContext db = new FoodOrderDbContext())
            {
                var itemData = new ItemViewModel
                {
                    Items = db.FoodItems.Where(s => s.isEnabled == true && s.isDeleted ==false && s.quantity > 0).Select(s=> new ItemsModel
                    {
                        itemId  = s.itemId,
                        price    = s.price,
                        name    = s.name,
                        image=s.image ,
                        quantity = s.quantity
                        
                    }).OrderBy(x => Guid.NewGuid()).Take(4).ToList()
                };
                return itemData;
            }

        }
        public static ItemViewModel GetItemsData(int id)
        {
            using (FoodOrderDbContext db = new FoodOrderDbContext())
            {
                var itemData = new ItemViewModel
                {
                    Items = db.FoodItems.Where(s => s.isEnabled == true && s.isDeleted == false && s.catId==id && s.quantity > 0).Select(s => new ItemsModel
                    {
                        itemId = s.itemId,
                        price = s.price,
                        name = s.name,
                        image = s.image,
                        quantity = s.quantity

                    }).OrderBy(x => Guid.NewGuid()).ToList()
                };
                return itemData;
            }

        }


    }

   
}
