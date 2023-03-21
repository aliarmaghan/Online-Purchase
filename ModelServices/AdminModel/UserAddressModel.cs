using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelServices.AdminModel
{
    public class UserAddressModel
    {
        public string USERID { get; set; }
        [Required(ErrorMessage = "Please Enter Your Address")]
        public string ADDRESS { get; set; }
        [Required(ErrorMessage = "Please enter your landmark")]
        public string LANDMARK { get; set; }
        public int COUNTRYID { get; set; }
        public int STATEID { get; set; }
        public int CITYID { get; set; }
        [Required(ErrorMessage = "Please enter your pincode")]
        [StringLength(6, MinimumLength = 3)]
        [RegularExpression("([0-9]+)")]
        public string PINCODE { get; set; }
    }
}
