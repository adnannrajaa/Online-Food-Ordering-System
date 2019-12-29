using OnlineFoodSystem.Models.Admin;
using OnlineFoodSystem.Models.DataBaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineFoodSystem.ViewModels.Admin
{
    public class ItemsViewModel
    {
        public IList<ItemModel> Items { get; set; }
        public static ItemsViewModel GetItemData()
        {
            using (FoodOrderDbContext db = new FoodOrderDbContext())
            {
                var itemData = new ItemsViewModel
                {
                    Items = db.FoodItems.Where(s => s.isDeleted != true).Select(f=> new ItemModel
                    {
                        itemId = f.itemId,
                        catId = f.catId,
                        name = f.name,
                        description = f.description,
                        price=f.price,
                        quantity= f.quantity,
                        isEnabled = f.isEnabled,
                        isDeleted = f.isDeleted,
                        image = f.image

                    }).ToList()
                };
                return itemData;
            }

        }
    }
}