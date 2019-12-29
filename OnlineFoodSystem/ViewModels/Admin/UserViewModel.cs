using OnlineFoodSystem.Models.Admin;
using OnlineFoodSystem.Models.DataBaseModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OnlineFoodSystem.ViewModels.Admin
{
    public class UserViewModel
    {
        public IEnumerable<UserModel> User { get; set; }

        public static UserViewModel GetUserDetails()
        {
            using (FoodOrderDbContext db = new FoodOrderDbContext())
            {
                var UserData = new UserViewModel
                {
                    User = db.Users.Select(f=> new UserModel
                    {
                        userId = f.userId,
                        username = f.username,
                        email = f.email
                    }).ToList()
                };
                return UserData;
            }

        }
    }
}