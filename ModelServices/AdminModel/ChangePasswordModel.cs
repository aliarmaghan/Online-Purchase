using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelServices.AdminModel
{
    public class ChangePasswordModel
    {

        [Required(ErrorMessage = "Old Password is required!")]
        [DataType(DataType.Password)]
        public string OldPassword { get; set; }


        [Required(ErrorMessage = "New Password is required!")]
        [DataType(DataType.Password)]
        public string NewPassword { get; set; }

        [Required(ErrorMessage = "Confirm Password is required!")]
        [DataType(DataType.Password)]
        [Compare("NewPassword", ErrorMessage = "The new password and confirm password do not match.")]
        public string ConfirmPassword { get; set; }
    }
}
