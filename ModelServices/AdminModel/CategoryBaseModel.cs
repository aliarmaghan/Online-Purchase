using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelServices.AdminModel
{
    public class CategoryBaseModel
    {
        [Required(ErrorMessage = "Please enter category name")]
        public string CATEGORY_NAME { get; set; }
        public int CATEGORY_ID { get; set; }
        [Required(ErrorMessage = "Please enter Category Code")]
        public string CATEGORY_CODE { get; set; }
        public bool IS_ACTIVE { get; set; }

        public string USERID { get; set; }
        public List<CategoryModel> Categories { get; set; }
    }
}
