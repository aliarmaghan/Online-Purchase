﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelServices.AdminModel
{
    public class UserProfileModel
    {

        public string EMAIL { get; set; }
        public string USERID { get; set; }
        public string USERNAME { get; set; }
        [Required(ErrorMessage = "Please Enter Valid Mobile no")]
        [StringLength(10,MinimumLength =10)]
        [RegularExpression("([0-9]+)")]
        public string PHONENUMBER { get; set; }
        public string PROFICPATH { get; set; }
        public UserAddressModel LISTOFADDRESS { get; set; }
        
        public List<CountryModel> countryModels { get; set; }
       
        public List<StateModel> stateModels { get; set; }
     
        public List<CityModel> cityModels { get; set; }
    }
}
