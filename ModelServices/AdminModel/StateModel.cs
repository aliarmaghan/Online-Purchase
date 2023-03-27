using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelServices.AdminModel
{
    public class StateModel
    {
        public int STATEID { get; set; }
        //[Required(ErrorMessage = "Please enter state name")]
        public string STATENAME { get; set; }
        //[Required(ErrorMessage = "Please Select country name")]
        public int COUNTRYID { get; set; }
        public string COUNTRY_NAME { get; set; }
        public string USERID { get; set; }
        public bool ISACTIVE { get; set; }
        public string MODIFIEDBY { get; set; }
        public string MODIFIEDDATE { get; set; }

        public List<CountryModel> countryModels { get; set; }

    }
}

