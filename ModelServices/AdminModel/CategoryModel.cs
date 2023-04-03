using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelServices.AdminModel
{
    public class CategoryModel
    {
        public int CATEGORY_ID { get; set; }
        [Required(ErrorMessage = "Please enter Category Name")]
        public string CATEGORY_NAME { get; set; }
        public string CATEGORY_CODE { get; set; }
        public bool IS_ACTIVE { get; set; }
        public string MODIFIED_DATE { get; set; }
        public string MODIFIED_BY { get; set; }
    }
}
