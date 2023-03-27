using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelServices.AdminModel
{
    public class CountryModel
    {
        public int ID { get; set; }

        //[Required(ErrorMessage = "Please enter country name")]
        public string COUNTRY_NAME { get; set; }
        public string COUNTRY_CODE { get; set; }
        public string MODIFIED_DATE { get; set; }
        public bool IS_ACTIVE { get; set; }
        public string MODIFIED_BY { get; set; }
        public string USERID { get; set; }
    }
}
