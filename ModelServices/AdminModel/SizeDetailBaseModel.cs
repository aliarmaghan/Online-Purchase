using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelServices.AdminModel
{
    public class SizeDetailBaseModel
    {
        public int S_Id { get; set; }
        [Required(ErrorMessage = "Please enter size ")]
        [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "Use letters only please")]
        public string A_Size_Name { get; set; }
        [Required(ErrorMessage = "Please enter size ")]
        [Range(1, Int64.MaxValue, ErrorMessage = "Please enter a numeric Value")]
        public string N_Size_Name { get; set; }
        [Required(ErrorMessage = "Please Select Size Type")]
        public int Ref_Size_Id { get; set; }
        public bool IS_ACTIVE { get; set; }
        public string USERID { get; set; }
        public List<SizeDetailModel> sizeDetails  { get; set; }
        //public List<SizeMTBaseModel> sizeMTBases { get; set; }

        public List<SizeMTModel> sizeMTModels { get; set; }
    }
}
