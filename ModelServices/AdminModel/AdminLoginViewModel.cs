using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ModelServices.AdminModel
{
    public class AdminLoginViewModel
    {
        [Required(ErrorMessage = "Please enter your valid email id")]
        [EmailAddress]
        public string Email { get; set; }

        [Required(ErrorMessage = "Please enter your valid password")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
