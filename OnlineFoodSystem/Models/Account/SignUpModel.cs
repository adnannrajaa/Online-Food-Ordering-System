using OnlineFoodSystem.Models.DataBaseModel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace OnlineFoodSystem.Models.Account
{
    public class SignUpModel
    {
        public string UserName { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public static bool VerifyEmail(string username)
        {
            using (FoodOrderDbContext db = new FoodOrderDbContext())
            {
                var rec = db.Users.Where(s => s.username == username).Count();
                if(rec >=1)
                {
                    return true;

                }
            }
            return false;

        }

        public static void SaveRecord(SignUpModel data)
        {
            using (FoodOrderDbContext db = new FoodOrderDbContext())
            {
                User adduser = new User();
                adduser.email = data.email;
                adduser.username = data.UserName;
                adduser.password = data.password;

                db.Users.Add(adduser);
                db.SaveChanges();

            }
        }
    }
}