using OnlineFoodSystem.Models.Admin;
using OnlineFoodSystem.Models.DataBaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineFoodSystem.ViewModels.Admin
{
    public class CategoryViewModel
    {
        public IList<CatagoryModel> Category { get; set; }
        public static CategoryViewModel GetCatagoryData()
        {
            using (FoodOrderDbContext db = new FoodOrderDbContext())
            {
                var catData = new CategoryViewModel
                {
                    Category = db.Categories.Select(s => new CatagoryModel
                    {
                        CategoryId = s.catId,
                        CategoryName = s.name

                    }).OrderByDescending(s=>s.CategoryId).ToList()
                };
                return catData;
            }

        }

        public static bool VerifyCategory(string categoryName)
        {
            using (FoodOrderDbContext db = new FoodOrderDbContext())
            {
                var name = db.Categories.Where(s => s.name == categoryName).Count();
                if (name >= 1)
                {
                    return true;
                }

            }
            return false;
        }
    }
}