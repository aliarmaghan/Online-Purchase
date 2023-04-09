using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelServices.AdminModel
{
    public class GenderBaseModel
    {
        public int ID { get; set; }
        [Required(ErrorMessage = "Please enter Gender")]
        public string GEN_TYPE { get; set; }
        [Required(ErrorMessage = "Please enter Gender Code")]
        public string GEN_CODE { get; set; }
        public bool IS_ACTIVE { get; set; }
        public string USERID { get; set; }
        public List<GenderModel> Genders { get; set; }

    }
}
