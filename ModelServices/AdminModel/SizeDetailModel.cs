using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelServices.AdminModel
{
    public class SizeDetailModel
    {
        public int S_Id { get; set; }
        [Required(ErrorMessage = "Please enter Size name")]
        public string Size_Name { get; set; }
        public int Ref_Size_Id { get; set; }
        public string Size_Type { get; set; }
        public bool IS_ACTIVE { get; set; }
        public string CREATED_DATE { get; set; }
        public string CREATED_BY { get; set; }
        public string MODIFIED_DATE { get; set; }
        public string MODIFIED_BY { get; set; }
        public string USERID { get; set; }
    }
}
