using OnlineFoodSystem.Models.DataBaseModel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace OnlineFoodSystem.Models.Account
{
    public class SignInModel
    {
       
        public string email { get; set; }
        public string password { get; set; }

        public static bool VerifyUserNameAndPassword(string email, string password)
        {
            using (FoodOrderDbContext db = new FoodOrderDbContext())
            {
                var rec = db.Users.Where(s => (s.username == email && s.password == password)).Count();
                if(rec ==1)
                { 
                    return true;
                }
            }
                return false;
        }

        public static decimal GetUserId(string email)
        {
           
            using (FoodOrderDbContext db = new FoodOrderDbContext())
            {
               var id = db.Users.Where(s => (s.username == email)).Select(s=>s.userId).FirstOrDefault();
               return id;
            }
        }

       
    }
}