using OnlineFoodSystem.Models.DataBaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineFoodSystem.Models.Home
{
    public class CategoryModel
    {
        public IEnumerable<ListCategory> category { get; set; }
        public static CategoryModel GetCategory()
        {
            using (FoodOrderDbContext db = new FoodOrderDbContext())
            {
                var cat = new CategoryModel
                {
                    category = db.Categories.Join(db.FoodItems, c=>c.catId,f=>f.catId,(c,f)=> new {c,f }).Select(s => new ListCategory {
                        catId = s.c.catId,
                        name = s.c.name
                    }).Distinct().ToList()
                };
                return cat;
            }
        }
    }
}